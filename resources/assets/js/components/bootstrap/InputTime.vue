<template>
    <div class="input-group">
        <input class="form-control" ref="input" v-mask="'29:59'" :data-category="dataCategory">
        <span class="input-group-btn">
            <button class="btn btn-default" type="button" @click="show">
                <i class="fa fa-clock-o"></i>
            </button>
        </span>
    </div>
</template>
<script>
    import $ from 'jquery'
    import moment from 'moment'
    export default {
        props: ['value', 'data-category'],
        mounted () {
            const $input = $(this.$refs['input']).val(this.format(this.value));
            $input.datetimepicker({
                locale: 'pt-BR',
                useCurrent: false,
                format: 'HH:mm'
            }).on({
                'focus': function () {
                    $(this).select()
                },
                'dp.change': event => {
                    const date = event.date;
                    date.toString = function () {return this._isValid ? this.format('HH:mm') : '' };
                    date.toISOString = function () {return this._isValid ? this.format('HH:mm') : ''};
                    this.$emit('input', date);
                }
            });
        },
        methods: {
            format(value) {
                if (value === null) {
                    return '';
                }
                const format = 'HH:mm'.slice(0, value.length);
                const date = moment(value, format);
                return date._isValid ? date.format('HH:mm') : '';
            },
            show () {
                $(this.$refs['input']).data('DateTimePicker').show();
            }
        },
        watch: {
            value: function (value) {
                $(this.$refs['input']).val(this.format(value));
            }
        }
    }
</script>
