<template>
    <toggle-button v-model="model"></toggle-button>
</template>
<script>
    export default {
        props: ['value', 'option'],
        computed: {
            model: {
                get () {
                    return this.value == 1;
                },
                set (newValue) {
                    this.$emit('input', newValue ? 1 : 0);
                }
            }
        }
    }
</script>