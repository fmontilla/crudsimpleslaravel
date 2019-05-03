<template>
    <toggle-button v-model="model" :sync="true"></toggle-button>
</template>
<script>
    import _ from 'lodash'
    export default {
        props: ['value', 'option'],
        computed: {
            model: {
                get () {
                    return _.includes(this.value, this.option);
                },
                set (newValue) {
                    let value = _.clone(this.value);
                    if (newValue) {
                        value.push(this.option);
                    } else {
                        value = value.filter(value => value !== this.option);
                    }
                    this.$emit('input', value);
                }
            }
        }
    }
</script>