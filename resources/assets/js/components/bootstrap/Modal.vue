<template>
    <div ref="modal" class="modal">
        <div class="modal-dialog" :class="{'modal-lg': size === 'lg', 'modal-sm': size === 'sm'}">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" v-on:click="onCancel">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Fechar</span>
                    </button>
                    <h4 class="modal-title">{{ title }}</h4>
                </div>
                <form ref="form" v-on:submit.prevent="onSubmit">
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer" v-if="buttonOk || buttonCancel">
                        <button v-show="buttonOk" class="btn btn-primary" v-text="buttonOkTitle"></button>
                        <button v-show="buttonCancel" type="button" class="btn btn-link" data-dismiss="modal" v-on:click="onCancel" v-text="buttonCancelTitle"></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import Validator from '../../bootstrap/ui/Validator'
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            size: {
                type: String,
                default: ''
            },
            buttonOk: {
                type: Boolean,
                default: true
            },
            buttonOkTitle: {
                type: String,
                default: 'Ok'
            },
            buttonCancel: {
                type: Boolean,
                default: true
            },
            buttonCancelTitle: {
                type: String,
                default: 'Cancelar'
            }
        },
        computed: {
            $form () {
                return $(this.$refs['form'])
            }
        },
        methods: {
            show () {
                $(this.$refs['modal']).modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                })
                this.$emit('show')
            },
            hide () {
                Validator.resetForm(this.$form)
                $(this.$refs['modal']).modal('hide').removeData('bs.modal')
                this.$emit('hide')
            },
            onSubmit () {
                Validator.resetForm(this.$form)
                this.$emit('submit')
            },
            onCancel () {
                this.hide()
                this.$emit('cancel')
            }
        }
    }
</script>