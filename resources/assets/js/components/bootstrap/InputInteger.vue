<template>
    <input-number :decimal-places="0" v-model="model" v-on:change="change" :data-category="dataCategory"></input-number>
</template>
<script>
    export default {
        props: ['value', 'dataCategory'],
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