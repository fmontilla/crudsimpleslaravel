<template>
    <div ref="thumbnail" class="col-xs-12 col-sm-6 col-md-3 text-center upload-file" v-if="value !== null">
        <div :class="{'upload-file-thumbnail-selected': selected}">
            <div :class="[uploadFileThunbnailOver]" class="upload-file-thumbnail" v-on:click="select">
                <button
                    type="button"
                    class="btn btn-danger btn-xs upload-file-button-close"
                    v-on:click="remove">
                    <i class="fa fa-close"></i>
                </button>
                <template v-if="type !== null">
                    <div
                        ref="container"
                        v-if="type === 'TYPE_IMAGE'"
                        class="upload-file-thumbnail-image"
                        :class="[classSize]"
                        :style="getStyleUrlComputed">
                        <button
                            type="button"
                            class="btn btn-primary btn-xs upload-file-button-show"
                            v-on:click="show">
                            <i class="fa fa-expand"></i>
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary btn-xs upload-file-button-rotate"
                            v-if="showRotate"
                            v-on:click="rotate">
                            <i class="fa fa-rotate-right"></i>
                        </button>
                    </div>
                    <div v-if="type === 'TYPE_FILE'" class="upload-file-thumbnail-file">
                        <i class="fa fa-file"></i>
                        <br>
                        <br>
                        <span v-if="public_url === null">{{ name }}</span>
                        <a v-if="public_url !== null" :href="public_url" target="_blank" @click.prevent="download(public_url, $event)">{{ name }}</a>
                    </div>
                </template>
            </div>
        </div>
        <div ref="slot" class="upload-file-thumbnail-slot col-xs-12" style="display: none">
            <slot></slot>
        </div>
    </div>
</template>
<script>

    import mime from 'mime-types'
    import isImageUrl from 'is-image-url'
    import Dialog from '../../bootstrap/ui/Dialog'
    import Loading from '../../bootstrap/ui/Loading'

    export default {
        props: {
            value: {
                default: {
                    public_url: null,
                    file: null,
                    blob: null,
                    src: null,
                    posicao: null
                }
            },
            posicao: {
                default: null
            },
            showRotate: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            getClassRotate () {
              return this.classesRotate[this.classRotate % 4] || '';
            },
            getStyleUrlComputed() {
              return `background-image: url('${this.public_url}')`;
            },
            uploadFileThunbnailOver () {
                return this.value.file == null || this.public_url ? 'upload-file-thumbnail-hover' : '';
            }
        },
        data () {
            return {
                name: null,
                classSize: '',
                classRotate: null,
                classesRotate: [
                    'upload-file-thumbnail-image-90',
                    'upload-file-thumbnail-image-180',
                    'upload-file-thumbnail-image-270'
                ],
                url: null,
                type: null,
                public_url: null,
                selected: false
            }
        },
        mounted () {
            this.init()

            $(this.$refs['thumbnail']).on('uploadFileChangePosition', (event, posicao) => {
                this.value.posicao = posicao
                this.$emit('input', this.value)
            });

            if ($(this.$refs['slot']).children('*').length) {
                $(this.$refs['slot']).show();
            }

            $(this.$refs['thumbnail']).on({
                '_select': () => {
                    this.selected = false
                    this.select()
                },
                '_unSelect': () => {
                    this.selected = true
                    this.select()
                },
                '_remove': () => {
                    this.remove();
                }
            }).closest('.upload-files-container').trigger('_load', this.value)
        },
        methods: {
            init() {
                if (this.value.file) {
                    if (this.value.file.type.indexOf('image') === 0) {
                        const fileReader = new FileReader();
                        fileReader.onload = event => {
                            this.public_url = event.target['result'];
                        };
                        fileReader.readAsDataURL(this.value.file);
                        this.type = 'TYPE_IMAGE';
                    } else {
                        this.name = this.value.file.name;
                        this.type = 'TYPE_FILE';
                    }
                } else if (this.value.public_url) {
                    this.type = this.isImageUrl(this.value.public_url) ? 'TYPE_IMAGE' : 'TYPE_FILE'
                    this.name = this.value['original_name'];
                    const public_url = this.value.public_url.indexOf('/') === 0 ? this.value.public_url : '/' + this.value.public_url;
                    this.public_url = (typeof BASEURL === 'undefined' ? '' : BASEURL) + public_url;
                } else if ('original_name' in this.value) {
                    this.type = this.isImageUrl(this.value['original_name']) ? 'TYPE_IMAGE' : 'TYPE_FILE'
                    this.name = this.value['original_name'];
                    this.public_url = this.value.nome
                }
            },
            select () {
                this.selected = !this.selected;
                this.$emit(this.selected ? '_select' : '_unSelect', this.value);
                $(this.$refs['thumbnail'])
                    .closest('.upload-files-container')
                    .trigger(this.selected ? '_select' : '_unSelect', this.value);
            },
            show ($event) {
                $event.cancelBubble = true;
                Dialog.open({
                    content: `<img src="${this.public_url}" style="width: 100%">`,
                    size: 'lg'
                });
            },
            setClassSize (width, height) {
                this.classSize = width > height ? 'upload-file-thumbnail-height' : 'upload-file-thumbnail-width'
            },
            remove (event) {
                const fnRemove = () => {
                    this.$emit('remove', this.value)
                    $(this.$refs['thumbnail']).closest('.upload-files-container').trigger('_remove', this.value)
                };
                if (event) {
                    event.cancelBubble = true;
                    Dialog.confirm('Deseja realmente remover este arquivo?', fnRemove)
                } else fnRemove();
            },
            rotate (event) {
                event.cancelBubble = true;
                Loading.on();
                const image = new Image();
                $(image).on('rotate', (e, data) => {
                    const fileOfBlob = new File([data.blob], this.value.public_url);
                    this.$set(this, 'public_url', data.dataURL);
                    this.$set(this.value, 'file', fileOfBlob);
                    this.$emit('input', this.value);
                    Loading.off();
                });
                $(image).one('load', function () {
                    this.rotateNext();
                });
                image.src = this.public_url;
            },
            isImageUrl (url) {
                url = url.replace(/\/$/g, '');
                return isImageUrl(url);
            },
            download (public_url, $event) {
                $event.cancelBubble = true;
                window.location.href = public_url
            }
        },
        watch: {
            'public_url': function(value) {
                if (value !== null) {
                    const mimeLookup = mime.lookup(value);
                    if (value.indexOf('data:image') === 0 || (mimeLookup && mimeLookup.indexOf('image') === 0)) {
                        this.$set(this, 'type', 'TYPE_IMAGE');
                        const image = new Image();
                        image.onload = () => {
                            this.setClassSize(image.width, image.height);
                            this.public_url = value;
                            this.$set(this, 'type', 'TYPE_IMAGE');
                        };
                        image.src = value;
                    } else {
                        this.$set(this, 'type', 'TYPE_FILE');
                    }
                } else {
                    this.$set(this, 'type', null);
                }
            },
            'value.public_url': function (value) {
                this.public_url = value.indexOf('/') === 0 ? value : '/' + value
            },
            'value': function () {
                this.init()
            }
        }
    }
</script>
<style lang="scss" scope>

    .upload-file {
        .upload-file-thumbnail {
            background-color: #ECECEC;
        }
    }

    .upload-file-thumbnail {
        min-height: 200px;
    }

    .upload-file-thumbnail-hover:hover {
        border-color: #2693b8;
        opacity: .9;
        cursor: pointer;
    }

    .upload-file-thumbnail-selected {
        background-color: #213f5f;
        .upload-file-thumbnail {
            background-color: transparent !important;
        }
        div:first-child {
            opacity: .6;
            border-color: #213f5f !important;
        }
        .upload-file-thumbnail-file {
            color: #fff;
        }
    }

    .upload-file-button-close, .upload-file-button-rotate, .upload-file-button-show {
        position: absolute;
        top: 10px;
    }

    .upload-file-button-close {
        right: 23px;
    }

    .upload-file-button-rotate {
        right: 85px;
    }

    .upload-file-button-show {
        right: 53px;
    }

    .upload-file-thumbnail-image, .upload-file-thumbnail-file {
        background-repeat: no-repeat;
        background-position: center center;
        min-height: 196px;
    }

    .upload-file-thumbnail-file {
        .fa {
            font-size: 2.5em;
            margin-top: 20px;
        }
        font-weight: bold;
        cursor: pointer;
    }

    .upload-file-thumbnail-height {
        background-size: auto 100%;
    }

    .upload-file-thumbnail-width {
        background-size: 100% auto;
    }

    .upload-file-thumbnail, .upload-file-thumbnail-slot {
        border: 2px solid #267196;
    }

    .upload-file-thumbnail-slot {
        text-align: left;
        padding-top: 15px;
        background-color: #267196;
        label {
            color: #fff;
            font-size: .9em;
            font-weight: bold;
        }
    }

</style>