<template>
    <div>
        <div class="row container-fluid">
            <div class="btn-group btn-group-sm" role="group">
                <button
                    type="button"
                    class="btn btn-default"
                    :disabled="isSelectAll === false"
                    v-on:click="selectAll">
                    <i class="fa fa-th"></i>
                    Selecionar tudo
                </button>
                <button
                    type="button"
                    class="btn btn-default"
                    :disabled="isRemove === false"
                    v-on:click="removeSelected">
                    <i class="fa fa-close"></i>
                    Remover
                </button>
            </div>
        </div>
        <div class="row">
            <div class="upload-files-container" ref="thumbnails">
                <slot></slot>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3 text-center">
                <div class="upload-file-dropzone" ref="dropzone">
                    <i class="fa fa-upload"></i>
                    <p>{{ description }}</p>
                    <button type="button" class="btn btn-primary upload-file-button" v-html="button"></button>
                    <input type="file" ref="file" v-on:change="change" multiple :accept="accept">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash'
    import mime from 'mime-types'
    import Notify from '../../bootstrap/ui/Notify'
    import Dialog from '../../bootstrap/ui/Dialog'
    import mimeExtensions from 'mime-to-extensions'

    export default {
        props: {
            value: {
                default() {
                    return [];
                }
            },
            description : {
                default: 'Arraste e solte seus arquivos aqui ou'
            },
            button: {
                default: 'Buscar<br>arquivos'
            },
            accept: {
                default: '*/*'
            },
            msgErrorAccept: {
                default: 'O arquivo <b>{name}</b> é inválido, apenas arquivos com as extensões <b>{extensions}</b> são permitidos'
            }
        },
        computed: {
            getAcceptExtensions () {
                if (this.accept === '*/*') {
                    return true;
                }
                const isExtensions = this.accept.indexOf('.') !== -1;
                let extensions = [];
                if (isExtensions) {
                    extensions = this.accept.split(',').map(extension => extension.trim().replace('.', ''));
                } else {
                    const mimes = /^([a-z09]{0,})+\/+([a-z0-9\+\-\.\*]{0,})/.exec(this.accept)
                    const firstPart = mimes[1];
                    const secondPart = mimes[2];
                    _.forEach(mimeExtensions.types, function (value, key) {
                        if (value.split('/')[0] === firstPart && (value.split('/')[1] === secondPart || secondPart === '*')) {
                            extensions.push(key);
                        }
                    })
                }
                return extensions;
            }
        },
        data () {
            return {
                isSelectAll: false,
                isSelectedAll: false,
                isRemove: false
            }
        },
        mounted () {
            const $dropzone = $(this.$refs['dropzone']);
            $dropzone.on({
                'dragover dragenter': event => {
                    $dropzone.addClass('upload-file-dropzone-over');
                    event.preventDefault();
                    event.stopPropagation();
                },
                'dragout dragleave': () => {
                    $dropzone.removeClass('upload-file-dropzone-over');
                },
                'drop': event => {
                    $dropzone.removeClass('upload-file-dropzone-over');
                    event.preventDefault();
                    event.stopPropagation();
                    const dataTransfer = event.originalEvent.dataTransfer;
                    if (dataTransfer && dataTransfer.files.length) {
                        const files = dataTransfer.files;
                        this.change(files)
                    }
                },
                'click': this.select
            });
            this.sortable();
            $(this.$refs['thumbnails']).on('_remove _select _unSelect _load', (event, value) => {
                setTimeout(() => {
                    this.$emit(event.type.replace('_', ''), value);
                    this.isRemove = $(this.$refs['thumbnails']).find('.upload-file-thumbnail-selected').length > 0
                    this.isSelectAll = $(this.$refs['thumbnails']).find('.upload-file-thumbnail').length > 0
                }, 100)
            })
        },
        updated() {
            this.sortable();
        },
        methods: {
            select() {
                this.$refs['file'].click();
            },
            change (argument) {
                let files = argument;
                if (argument instanceof Event) {
                    files = argument.target['files'];
                }
                Array.from(files).forEach(file => {
                    if (this.isAccept(file)) {
                        this.$emit('add', file);
                        this.sortable();
                    } else {
                        Notify.alert(this.msgErrorAccept.template({
                            name: file.name,
                            extensions: this.getAcceptExtensions.join(', ')
                        }));
                    }
                });
            },
            isAccept (file) {
                return this.getAcceptExtensions === true || _.includes(this.getAcceptExtensions, mime.extension(file.type));
            },
            sortable() {
                try {
                    $(this.$refs['thumbnails']).sortable('destroy');
                } catch (e) {}
                $(this.$refs['thumbnails']).sortable({
                    forceHelperSize: true,
                    forcePlaceholderSize: true,
                    update: (event, ui) => {
                        const $thumbnails = $(this.$refs['thumbnails']).children('div');
                        $thumbnails.each(function (i) {
                            $(this).triggerHandler('uploadFileChangePosition', [i]);
                        })
                        this.$emit('sortable-update')
                    }
                });
            },
            selectAll() {
                $(this.$refs['thumbnails']).find('.upload-file-thumbnail').trigger(this.isSelectedAll ? '_unSelect' : '_select');
                this.isSelectedAll = !this.isSelectedAll
            },
            removeSelected() {
                Dialog.confirm('Deseja realmente remover o(s) arquivo(s) selecionado(s)?', () => {
                    $(this.$refs['thumbnails']).find('.upload-file-thumbnail-selected').trigger('_remove');
                    $(this.$refs['thumbnails']).find('.upload-file-thumbnail').trigger('_unSelect')
                });
            },
        }
    }
</script>
<style lang="scss" scoped>

    .col-xs-12 {
        margin-top: 20px;
    }

    .upload-file-dropzone {
        border: 2px dashed #267196;
        font-weight: bold;
        padding: 5px;
        cursor: pointer;
        background-color: #ededed;
        min-height: 200px;
    }

    .upload-file-dropzone-over {
        border-style: solid;
        background-color: #fff;
    }

    input[type=file] {
        display: none
    }

    .upload-file-button {
        text-transform: uppercase;
        font-weight: bold;
        margin: 2px;
    }

    .fa.fa-upload {
        font-size: 2em;
        margin: 13px;
    }

</style>