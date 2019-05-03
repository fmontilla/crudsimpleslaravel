<template>
    <div class="input-group">
        <input class="form-control" ref="input" v-mask="'39/19/9999 29:59'" :data-category="dataCategory">
        <span class="input-group-btn">
            <button class="btn btn-default" type="button" @click="show">
                <i class="fa fa-calendar"></i>
            </button>
        </span>
    </div>
</template>
<script>
    import $ from 'jquery'
    import moment from 'moment'
    export default {
        props: ['value', 'dataCategory'],
        mounted () {
            const $input = $(this.$refs['input']).val(this.format(this.value));
            $input.datetimepicker({
                locale: 'pt-BR',
                useCurrent: false,
                allowInputToggle: true
            }).on({
                'focus': function () {
                    $(this).select()
                },
                'dp.change': event => {
                    let date = event.date;
                    date = date.isValid() ? date.format('YYYY-MM-DD HH:mm') : null
                    this.$emit('input', date)
                }
            });
        },
        methods: {
            format(value) {
                if (value === null) {
                    return '';
                }
                const format = 'YYYY-MM-DD HH:mm'.slice(0, value.length);
                const date = moment(value, format);
                return date._isValid ? date.format('DD/MM/YYYY HH:mm') : '';
            },
            show () {
                $(this.$refs['input']).data("DateTimePicker").show();
            }
        },
        watch: {
            value: function (value) {
                $(this.$refs['input']).val(this.format(value));
            }
        }
    }
</script>