<template>
    <div class="row">
        <div class="col-md-12 form-group">
            <label class="control-label">
                E-mail
            </label>
            <div class="row">
                <template v-for="(email, index) in model">
                    <div class="col-xs-12 col-md-5">
                        <input
                            type="email"
                            class="form-control"
                            v-model="model[index]"
                            :data-category="`${dataCategory}.${index}`"
                            v-show="readonly === false">
                        <p class="form-control-static" v-show="readonly" v-text="email"></p>
                    </div>
                    <div class="col-xs-12 col-md-1" v-show="readonly === false">
                        <button type="button" class="btn btn-primary" @click="add" v-if="index === 0">
                            <i class="fa fa-plus"></i>
                        </button>
                        <button type="button" class="btn btn-danger" @click="remove(index)" v-if="index !== 0">
                            <i class="fa fa-minus"></i>
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Array,
                default: function () {
                    return [''];
                }
            },
            dataCategory: {
                type: String,
                default: 'email'
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            model: {
                get () {
                    return this.value;
                },
                set (value) {
                    this.$emit('input', value);
                }
            }
        },
        methods: {
            add () {
                this.model = this.model.concat('');
            },
            remove(index) {
                this.model = this.model.filter((email, i) => {
                    return index !== i;
                });
            }
        }
    }
</script>