<template>
    <input type="text" class="form-control" ref="input" :value="input" :data-category="dataCategory">
</template>
<script>
    export default {
        props: {
            mask: {
                type: String,
                required: true
            },
            value: {
                default: null
            },
            dataCategory: {
                default: null
            }
        },
        computed: {
            input() {
                return this.value
            }
        },
        mounted () {
            this.setMask();
        },
        methods: {
            setMask () {
                const $input = $(this.$refs['input']);
                $input.val(this.value).off('change.input-mask').on('change.input-mask', () => {
                    this.$emit('input', $input.val());
                }).unsetMask();
                switch (this.mask) {
                    case 'phone':
                        let phone = $input.val().replace(/\D/g, '');
                        if (phone.length > 10) {
                            $input.setMask({mask: '(99) 99999-9999', autoTab: false})
                        } else {
                            $input.setMask({mask: '(99) 9999-99999', autoTab: false})
                        }
                        break;
                    default:
                        $input.setMask(this.mask);
                }
                $input.trigger('change.input-mask');
            }
        },
        watch: {
            mask () {
                this.setMask()
            },
            value () {
                this.setMask()
            }
        }
    }
</script>
