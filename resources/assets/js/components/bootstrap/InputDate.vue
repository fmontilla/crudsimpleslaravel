<template>
    <div class="input-group">
        <input
                class="form-control"
                ref="input"
                :data-category="dataCategory"
                :placeholder="placeholder"
                v-model="valueComputed">
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
        props: ['value', 'dataCategory', 'placeholder', 'minDate', 'maxDate'],
        computed: {
            valueComputed: {
                set (value) { },
                get () {
                    return this.format(this.value)
                }
            }
        },
        mounted () {
            const $input = $(this.$refs['input']).val(this.format(this.value))
            $input.setMask('99/99/9999')
            $input.datepicker({
                language: 'pt-BR',
                todayHighlight: true,
                autoclose: true,
                showOnFocus: true,
                startDate: this.minDate,
                endDate: this.maxDate
            }).on({
                'change': () => {
                    console.log('passou change')
                    const format = 'DD/MM/YYYY'.slice(0, $input.val().length);
                    let date = moment($input.val(), format);
                    date = date.isValid() ? date.format('YYYY-MM-DD') : null
                    this.$emit('input', date)
                },
                'changeDate': event => {
                    console.log('passou changeDate')
                    const format = 'DD/MM/YYYY'.slice(0, $input.val().length);
                    let date = moment($input.val(), format);
                    date = date.isValid() ? date.format('YYYY-MM-DD') : null
                    this.$emit('input', date)
                }
            })
        },
        watch: {
            value: function (value) {
                $(this.$refs['input']).val(this.format(value))
                $(this.$refs['input']).datepicker('update');
            },
            minDate () {
                $(this.$refs['input']).datepicker('setStartDate', this.format(this.minDate))
            },
            maxDate () {
                $(this.$refs['input']).datepicker('setEndDate', this.format(this.maxDate))
            }
        },
        methods: {
            show () {
                $(this.$refs['input']).datepicker('show')
            },
            format (value) {
                if (value === null) {
                    return ''
                }
                const format = 'YYYY-MM-DD'.slice(0, value.length)
                const date = moment(value, format)
                return date._isValid ? date.format('DD/MM/YYYY') : ''
            }
        }
    }

</script>
