<template>
    <nav v-if="datasource.total && datasource.total > 0" class="text-center">
        <ul class="pagination">
            <li v-bind:class="{disabled: datasource.current_page === 1}">
                <a href="#" :disabled="datasource.current_page === 1" @click.prevent="firstPage">
                    <span class="glyphicon glyphicon-fast-backward"></span>
                </a>
            </li>
            <li v-bind:class="{disabled: datasource.current_page === 1}">
                <a href="#" :disabled="datasource.current_page === 1" @click.prevent="prevPage">
                    <span class="glyphicon glyphicon-backward"></span>
                </a>
            </li>
            <li v-bind:class="{active: datasource.current_page === page}" v-for="page in pageRange">
                <a href="#" @click.prevent="loadPage(page)">{{ page }}</a>
            </li>
            <li v-bind:class="{disabled: datasource.current_page === datasource.last_page}">
                <a href="#" :disabled="datasource.current_page === datasource.last_page" @click.prevent="nextPage">
                    <span class="glyphicon glyphicon-forward"></span>
                </a>
            </li>
            <li v-bind:class="{disabled: datasource.current_page === datasource.last_page}">
                <a href="#" :disabled="datasource.current_page === datasource.last_page" @click.prevent="lastPage">
                    <span class="glyphicon glyphicon-fast-forward"></span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>

    import _ from 'lodash'

    export default {
        props: {
            datasource: {
                type: Object,
                default: {
                    total: 0,
                    from: 0,
                    to: 0,
                    current_page: 0,
                    last_page: 0
                }
            }
        },

        computed: {
            pageRange () {
                let pageBegin = (this.datasource.current_page - 2) < 1 ? 1 : (this.datasource.current_page - 2)
                let pageEnd = (pageBegin + 5) > this.datasource.last_page ? this.datasource.last_page : pageBegin + 4
                pageBegin = (pageBegin + 5) > this.datasource.last_page ? this.datasource.last_page - 4 : pageBegin
                return _.range(pageBegin < 1 ? 1 : pageBegin, pageEnd + 1)
            }
        },

        methods: {
            firstPage () {
                this.loadPage(1)
            },

            prevPage () {
                this.loadPage(this.datasource.current_page - 1)
            },

            loadPage (page) {
                if (this.datasource.current_page !== page) {
                    this.$emit('paginate', page)
                }
            },

            nextPage () {
                this.loadPage(this.datasource.current_page + 1)
            },

            lastPage () {
                this.loadPage(this.datasource.last_page)
            }
        }
    }
</script>
