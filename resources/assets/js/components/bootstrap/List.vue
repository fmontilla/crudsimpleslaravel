<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{title}}</h3>
            <slot name="buttons"></slot>
        </div>
        <div class="panel-body">
            <form v-on:submit.prevent="submit">
                <div class="input-group">
                    <input type="text" class="form-control" :placeholder="placeholder" v-model="search">
                    <span class="input-group-btn">
                        <button class="btn btn-default"><i class="fa fa-search"></i></button>
                    </span>
                </div>
            </form>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title','placeholder'],
        data () {
            return {'search': ''}
        },
        methods: {
            submit() {
                this.$emit('search', this.search)
            }
        }
    }
</script>

<style scoped>

</style>