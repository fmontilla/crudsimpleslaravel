<template>
    <input ref="input" class="form-control text-right" :data-category="dataCategory">
</template>
<script>
    export default {
        props: {
            value: {
                default: null
            },
            dataCategory: {
                default: null
            },
            decimalPlaces: {
                type: Number,
                default: 2
            },
            prefix: {
                type: String,
                default: ''
            },
            suffix: {
                type: String,
                default: ''
            }
        },
        mounted () {
            this.changeFormat();
            $(this.$refs['input']).val(this.value).trigger('change');
        },
        updated () {
            this.changeFormat();
        },
        methods: {
            changeFormat() {
                const $input = $(this.$refs['input']);
                $input.on({
                    change: () => {
                        let value = $input.val().removeNotNumber();
                        if (value.isBlank()) {
                            $input.val(null);
                            this.$emit('input', null);
                            this.$emit('change', null);
                        } else {
                            value = parseFloat(value).toFixed(this['decimalPlaces']);
                            if (this['decimalPlaces'] === 0) {
                                value = parseInt(value);
                            } else {
                                value = parseFloat(value);
                            }
                            this.$emit('input', value);
                            this.$emit('change', value);
                            const format = this['prefix'] + '#,##0' + (this['decimalPlaces'] > 0 ? '.'.repeat(this['decimalPlaces'], '0') : '') + this.suffix;
                            $input.val($.formatNumber(value, {locale: 'br', format: format}));
                        }
                    },
                    'click focus': () => {
                        $input.select();
                    }
                })
            }
        },
        watch: {
            value (value) {
                $(this.$refs['input']).val(value).trigger('change');
            }
        }
    }
</script>
