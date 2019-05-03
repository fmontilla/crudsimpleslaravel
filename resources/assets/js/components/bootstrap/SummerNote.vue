<template>
    <textarea ref="textarea"></textarea>
</template>

<script>
    export default {
        props: [
            'value'
        ],
        mounted() {
            $(this.$refs.textarea).val(this.value).summernote({
                callbacks:{
                    onBlur: value => {
                        console.log(arguments);
                        this.$emit('input',$(this.$refs.textarea).val());
                    }
                }
            });
        },
        watch: {
            value(value){
                $(this.$refs.textarea).summernote('code',value);
            }
        }
    }
</script>

<style scoped>

</style>