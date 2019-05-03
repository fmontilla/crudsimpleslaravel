<template>
    <div class="btn-group btn-toggle">
        <button class="btn btn-default">Sim</button>
        <button class="btn btn-primary active">Não</button>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        props: {
            value: {
                default: null
            }
        },
        mounted () {
            console.log(this.$el);
            $(this.$el).click(function() {
                $(this).find('.btn').toggleClass('active');

                if ($(this).find('.btn-primary').size()>0) {
                    $(this).find('.btn').toggleClass('btn-primary');
                }
                if ($(this).find('.btn-danger').size()>0) {
                    $(this).find('.btn').toggleClass('btn-danger');
                }
                if ($(this).find('.btn-success').size()>0) {
                    $(this).find('.btn').toggleClass('btn-success');
                }
                if ($(this).find('.btn-info').size()>0) {
                    $(this).find('.btn').toggleClass('btn-info');
                }

                $(this).find('.btn').toggleClass('btn-default');

            });

        }
    }
</script>
<style scoped>

</style>