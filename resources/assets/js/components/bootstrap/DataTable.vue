<template>
    <div class="panel panel-default panel-toolbar">
        <div class="panel-heading">
            <div class="container-fluid">

                <div class="row" v-show="title">
                    <div class="col-xs-12 form-group">
                        <h4>{{ title }}</h4>
                    </div>
                </div>

                <div class="row" ref="rowButtonInputSearch">

                    <div class="col-xs-12 col-sm-4 form-group">
                        <div class="btn-group">
                            <slot name="buttons"></slot>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-4 col-sm-offset-4 form-group" ref="colInputSearch">
                        <form v-on:submit.prevent="onSearch">
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="search" placeholder="Pesquisar...">
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="submit">
                                        <i class="glyphicon glyphicon-search"></i>
                                    </button>
                                    <button
                                        class="btn btn-link"
                                        type="button"
                                        v-on:click="showHideAdvancedSearch"
                                        v-show="advancedSearch">
                                        avançado
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>

                <form v-on:submit.prevent="onSearch" v-show="showAdvancedSearch">
                    <slot name="advancedSearch"></slot>
                    <div class="form-group text-center">
                        <button class="btn btn-primary" type="submit">
                            Pesquisar <i class="fa fa-search"></i>
                        </button>
                        <button class="btn btn-link" type="button" v-on:click="hideAdvancedSearch">
                            Busca simples
                        </button>
                    </div>
                </form>

            </div>
        </div>

        <p class="bg-info data-table-nothing-found" v-if="loaded && !datasource.data.length">
            <i class="fa fa-info-circle"></i>
            {{ messageNotFound }}
        </p>

        <div class="data-table" ref="body" v-show="datasource && datasource.data.length">
            <slot name="body"></slot>
        </div>

        <div class="summary" v-if="datasource && datasource.data.length" style="margin-top: 18px">
            <div class="row">
                <div class="col-xs-4 text-center">{{ datasource.total === 1 ? 'Registro' : 'Registros' }}:
                    <strong>{{ datasource.total }}</strong>
                </div>
                <div class="col-xs-4 text-center">
                    Exibindo:
                    <strong>{{ datasource.from }}</strong> - <strong>{{ datasource.to }}</strong>
                </div>
                <div class="col-xs-4 text-center">
                    Página:
                    <strong>{{ datasource.current_page }}</strong> - <strong>{{ datasource.last_page }}</strong>
                </div>
            </div>
        </div>

        <nav v-if="datasource && datasource.data.length > 0" class="text-center">
            <ul class="pagination">
                <li v-bind:class="{disabled: datasource.current_page === 1}">
                    <a href="#" :disabled="datasource.current_page === 1" @click.prevent="firstPage($event)">
                        <span class="glyphicon glyphicon-fast-backward"></span>
                    </a>
                </li>
                <li v-bind:class="{disabled: datasource.current_page === 1}">
                    <a href="#" :disabled="datasource.current_page === 1" @click.prevent="prevPage($event)">
                        <span class="glyphicon glyphicon-backward"></span>
                    </a>
                </li>
                <li v-bind:class="{active: datasource.current_page === page}" v-for="page in page_range">
                    <a href="#" @click="loadPage(page, $event)">{{ page }}</a>
                </li>
                <li v-bind:class="{disabled: datasource.current_page === datasource.last_page}">
                    <a href="#" :disabled="datasource.current_page === datasource.last_page" @click.prevent="nextPage($event)">
                        <span class="glyphicon glyphicon-forward"></span>
                    </a>
                </li>
                <li v-bind:class="{disabled: datasource.current_page === datasource.last_page}">
                    <a href="#" :disabled="datasource.current_page === datasource.last_page" @click.prevent="lastPage($event)">
                        <span class="glyphicon glyphicon-fast-forward"></span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
    import _ from 'lodash'

    import EmptyDataSource from '../../data/empty-data-source'

    export default {

        props: {
            title: {
                type: String,
                default: null
            },
            datasource: {
                default() {
                    return EmptyDataSource
                }
            },
            messageNotFound: {
                type: String,
                default: 'Nenhum registro encontrado.'
            },
            advancedSearch: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                loaded: false,
                showAdvancedSearch: false,
                search: null,
                path: null,
                params: {},
                current_page: 1,
                last_page: 1,
                pageBegin: 1,
                pageEnd: 5,
                page_range: [1]
            }
        },

        methods: {

            init () {
                const vue = this
                const $body = $(this.$slots['body'][0].elm)
                if ($body !== undefined) {
                    const $ths = $body.children('table').find('th[data-order-by]')
                    $ths.each(function() {
                        if ($(this).data('orderByDirection') === undefined) {
                            $(this).data('orderByDirection', 'ASC')
                        }
                        if ($(this).find('a').length === 0) {
                            $(this).wrapInner('<a href="#"></a>')
                            $(this).children('a').click(function(event) {
                                event.stopPropagation()
                                vue.sort($(this));
                            }).append('&nbsp;<i class="fa fa-sort"></i>')
                        }
                    })
                }
            },

            sort ($anchor) {

                const $th = $anchor.parent()
                const orderBy = $th.data('orderBy')

                if (!$th.data('orderByDirection')) {
                    $th.data('orderByDirection', 'ASC')
                }

                const orderByDirection = $th.data('orderByDirection') || 'ASC'
                const params = this.getParams()

                if ($anchor.hasClass('sort') && orderByDirection === 'ASC') {
                    $anchor.removeClass('sort')
                    $anchor.find('i').removeClass('fa-sort-desc').addClass('fa-sort')
                    delete params[`_orderBy[${orderBy}]`]
                } else {
                    $anchor.addClass('sort')
                    params[`_orderBy[${orderBy}]`] = orderByDirection
                    $anchor
                        .find('i')
                        .removeClass('fa-sort fa-sort-asc fa-sort-desc')
                        .addClass(`fa-sort-${orderByDirection.toLowerCase()}`)
                        .addClass('fa-sort')
                    $th.data('orderByDirection', orderByDirection === 'ASC' ? 'DESC' : 'ASC')
                }

                this.$emit('search', params)
            },

            getParams () {
                return Object.assign(this.params, {page: this.current_page})
            },

            firstPage ($event) {
                this.loadPage(1, $event)
            },

            prevPage () {
                const prevPage = this.datasource.current_page - 1
                if (prevPage >= 1) {
                    this.loadPage(prevPage)
                }
            },

            loadPage(page, $event) {
                if ($event) {
                    $event.cancelBubble = true
                }
                let params = this.getParams()
                params['page'] = page
                this.$emit('search', params)
            },

            nextPage () {
                const nextPage = this.datasource.current_page + 1
                if (nextPage <= this.datasource.last_page) {
                    this.loadPage(nextPage)
                }
            },

            lastPage ($event) {
                this.loadPage(this.last_page, $event)
            },

            onSearch () {
                let params = this.getParams()
                params['page'] = 1
                params['search'] = this.search
                this.$emit('search', params)
            },

            showHideAdvancedSearch () {
                this.showAdvancedSearch = !this.showAdvancedSearch
            },

            hideAdvancedSearch () {
                this.showAdvancedSearch = false
            }

        },

        watch: {
            'datasource': function(newValue) {

                if (newValue === null) {
                    newValue = EmptyDataSource
                }

                let value = newValue;
                if ('meta' in newValue) {
                    Object.assign(value, value.meta)
                }

                this.path           = value.path
                this.current_page   = value.current_page
                this.last_page      = value.last_page
                let pageBegin       = (this.current_page - 2) < 1 ? 1 : (this.current_page - 2)
                this.pageEnd        = (pageBegin + 5) > this.last_page ? this.last_page : pageBegin + 4
                this.pageBegin      = (pageBegin + 5) > this.last_page ? this.last_page - 4 : pageBegin
                this.page_range     = _.range(this.pageBegin < 1 ? 1 : this.pageBegin, this.pageEnd + 1)

                if (value.total) {
                    setTimeout(() => { this.init() }, 0)
                }

                this.loaded = true
            },
            'showAdvancedSearch': function (newValue) {
                const element = 'buttons' in this.$slots ? this.$refs['colInputSearch'] : this.$refs['rowButtonInputSearch']
                $(element)[newValue ? 'hide' : 'show']()
            }
        }

    }

</script>
<style lang="scss">

    .panel-toolbar {
        .panel-heading {
            padding: 15px 0 0 0;
        }
    }

    .data-table {
        table {
            border: none;
            thead {
                th {
                    text-align: center;
                    padding: 0;
                    a, &.no-sort {
                        white-space: nowrap;
                        padding: 10px;
                        text-align: center;
                    }

                    a {
                        display: block;
                        &[href]:hover, &[href]:active, &[href].sort {
                            text-decoration: underline;
                        }
                    }
                }
            }

            tr {
                th:first-child, td:first-child {
                    border-left: none;
                }
                th:last-child, td:last-child {
                    border-right: none
                }
                th {
                    border-bottom: none
                }
            }
        }

        nav {
            text-align: center;
        }
    }

    .data-table-nothing-found {
        margin: 0 !important;
        padding: 15px;
        font-size: 1.2em;
        font-weight: bold;
        text-align: center;
    }
</style>