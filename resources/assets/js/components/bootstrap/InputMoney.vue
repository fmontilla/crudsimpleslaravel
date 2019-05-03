<template>
    <input-number prefix="R$ " v-model="model" v-on:change="change" :data-category="dataCategory"></input-number>
</template>
<script>
    export default {
        props: ['value', 'data-category'],
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