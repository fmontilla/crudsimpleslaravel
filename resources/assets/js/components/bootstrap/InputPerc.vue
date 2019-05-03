<template>
    <input-number suffix=" %" v-model="model" v-on:change="change" :decimal-places="decimalPlaces" :data-category="dataCategory"></input-number>
</template>
<script>
    export default {
        props: {
            value: {
                default: null
            },
            decimalPlaces: {
                type: Number,
                default: 2
            },
            dataCategory: {
                default: null
            }
        },
        computed: {
            model: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value);
                }
            }
        },
        methods: {
            change (value) {
                this.$emit('change', value)
            }
        }
    }
</script>