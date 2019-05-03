<template>
    <select ref="select" class="form-control" :multiple="multiple">
        <slot></slot>
    </select>
</template>
<script>
    import $ from 'jquery'
    export default {
        props: {
            value: {
                default: null
            },
            firstSelected: {
                type: Boolean,
                default: true
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                isFirstSelected: true
            }
        },
        mounted () {
            this.initSelect2()
        },
        destroyed () {
            $(this.$refs['select']).select2('destroy')
        },
        updated () {
            this.initSelect2()
        },
        methods: {
            initSelect2 () {
                if ($(this.$refs['select']).data('select2')) {
                    $(this.$refs['select']).select2('destroy')
                }
                $(this.$refs['select']).val(this.value).select2().on('change.select2', () => {
                    let value = $(this.$refs['select']).val()
                    if (!isNaN(value) && !this.multiple) {
                        value = parseFloat(value)
                    }
                    if (!value && !this.multiple) value = null
                    this.$emit('input', value)
                    this.$emit('change', value)
                })
                if (this.firstSelected && this.isFirstSelected) {
                    this.setSelectedFirstOption()
                    this.isFirstSelected = false
                }
            },
            setSelectedFirstOption () {
                let self = this
                let value = this.value
                const isFirstSelected = this.value === null || ($(this.$refs['select']).children('option').length && $(this.$refs['select']).children('option').filter(function () {
                    if (self.multiple && $.inArray($(this).val(), value) !== -1) {
                        return true
                    }
                    return $(this).val() === value
                }).length === 0)
                if (isFirstSelected) {
                    $(this.$refs['select']).children('option:first').prop('selected', true)
                    let value = $(this.$refs['select']).val()
                    if (!isNaN(value) && !this.multiple) {
                        value = parseFloat(value)
                    }
                    if (!value && !this.multiple) value = null
                    this.$emit('input', value)
                    this.$emit('change', value)
                }
            }
        }
    }
</script>