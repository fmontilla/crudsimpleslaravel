<template>
    <div class="autocomplete-wraper" ref="autocomplete-wraper">
        <input type="text"
               ref="input"
               class="form-control"
               v-model="model"
               :data-category="dataCategory"
               :placeholder="placeholder"
               @input="handleInput"
               @keydown="handleKeyDown"
               @blur="handleBlur"
               @focus="handleFocus"
               @dblclick="handleDoubleClick"
        />
        <div v-show="showList && datasource.length" class="autocomplete autocomplete-list">
            <div class="autocompletescroll">
                <ul class="">
                    <li class="" v-for="(data, i) in datasource" :key="i" :class="activeClass(i)">
                        <a href="#"
                           @click.prevent="selectList(data)"
                           @mousemove="mousemove(i)"
                        >
                            <div v-if="template" v-html="template(data)"></div>
                            <div v-if="!template">
                                <span class="autocomplete-anchor-label">{{ deepValue(data, label) }}</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import _ from 'lodash'

    export default {
        props: {
            value: {
                default: null
            },
            autoComplete: {
                type: Boolean,
                default: true
            },
            dataCategory: {
                type: String,
                default: null
            },
            readonly: {
                type: Boolean,
                default: false
            },
            datasource: {
                default: []
            },
            template: {
                type: Function
            },
            placeholder: {
                default: null
            },
            anchor: {
                default: null,
                type: String
            },
            label: {
                default: null,
                type: String
            },
            onInput: Function,
            onShow: Function,
            onBlur: Function,
            onHide: Function,
            onFocus: Function,
            onSelect: Function
        },
        data () {
            return {
                showList: false,
                focusList: 0
            }
        },
        computed: {
            model: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value)
                }
            }
        },
        mounted () {
            this.$refs['input'].setAttribute('autocomplete', 'off')
            alert('teste')
        },
        methods: {
            getDatasource (e) {
                if (!this.autoComplete) return
                const {value} = e.target
                this.showList = true
                if (this.onInput) this.onInput(value)
                this.$emit('update-datasource', value)
            },
            handleInput: _.debounce(
                function (e) {
                    this.getDatasource(e)
                },
                800
            ),
            handleKeyDown (e) {
                if (!this.autoComplete) return
                let key = e.keyCode
                if (!this.showList) return

                const DOWN = 40
                const UP = 38
                const ENTER = 13
                const ESC = 27

                switch (key) {
                    case DOWN:
                        e.preventDefault()
                        this.focusList++
                        this.scrollToItem()
                        break
                    case UP:
                        e.preventDefault()
                        this.focusList--
                        this.scrollToItem()
                        break
                    case ENTER:
                        e.preventDefault()
                        this.selectList(this.datasource[this.focusList])
                        this.showList = false
                        break
                    case ESC:
                        this.showList = false
                        break
                }
                const listLength = this.datasource.length - 1
                const outOfRangeBottom = this.focusList > listLength
                const outOfRangeTop = this.focusList < 0
                const topItemIndex = 0
                const bottomItemIndex = listLength
                let nextFocusList = this.focusList
                if (outOfRangeBottom) nextFocusList = topItemIndex
                if (outOfRangeTop) nextFocusList = bottomItemIndex
                this.focusList = nextFocusList
            },
            handleBlur (e) {
                if (!this.autoComplete) return
                if (this.onBlur) this.onBlur(e)
                setTimeout(() => {
                    if (this.onHide) this.onHide()
                    this.showList = false
                }, 250)
            },
            handleFocus (e) {
                if (!this.autoComplete) return
                this.focusList = 0
                if (this.onFocus) this.onFocus(e)
            },
            handleDoubleClick (e) {
                this.getDatasource(e)
                if (this.onShow) this.onShow()
                this.showList = true
            },
            cleanUp (data) {
                return JSON.parse(JSON.stringify(data))
            },
            activeClass (i) {
                const focusClass = i === this.focusList ? 'focus-list' : ''
                return `${focusClass}`
            },
            selectList (data) {
                const clean = this.cleanUp(data)
                this.model = this.deepValue(clean, this.anchor)
                this.showList = false
                if (this.onSelect) this.onSelect(clean)
                this.$emit('itemSelected', clean)
            },
            mousemove (i) {
                this.focusList = i
            },
            scrollToItem () {
                let self = this
                var typingTimer
                var doneTypingInterval = 500
                clearTimeout(typingTimer)
                typingTimer = setTimeout(function () {
                    const $container = $(self.$refs['autocomplete-wraper']).find('.autocomplete-list ul')
                    const $scrollTo = $container.find('li').eq(self.focusList)
                    $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        },
                        500)
                }, doneTypingInterval)
            },
            deepValue (obj, path) {
                if (path) {
                    const arrayPath = path.split('.')
                    for (var i = 0; i < arrayPath.length; i++) {
                        obj = obj[arrayPath[i]]
                    }
                    return obj
                } else {
                    return obj
                }
            }

        }
    }
</script>

<style>
    .autocomplete-wraper{
        position: relative;
    }
    .autocomplete-wraper .autocomplete, .autocomplete-wraper .autocomplete ul, .autocomplete-wraper .autocomplete ul li a{
        transition:all 0.3s ease-out;
        -moz-transition:all 0.3s ease-out;
        -webkit-transition:all 0.3s ease-out;
        -o-transition:all 0.3s ease-out;
        position: relative;
    }
    .autocomplete-wraper .autocompletescroll{
        position: absolute;
        display: inline-block;
        min-width: 100%;
        z-index: 1;
        border: 1px solid #CCC;
        left: 0;
    }
    .autocomplete-wraper .autocomplete ul{
        padding: 0px;
        margin: 0px;
        border: 0;
        max-height: 150px;
        overflow: auto;
    }
    .autocomplete-wraper .autocomplete ul li a{
        text-decoration: none;
        display: block;
        background: #FFF;
        color: #2b2b2b;
        padding: 5px;
        padding-left: 10px;
    }
    .autocomplete-wraper .autocomplete ul li a:hover, .autocomplete-wraper .autocomplete ul li.focus-list a{
        color: white;
        background: #2F9AF7;
    }
    .autocomplete-wraper .autocomplete ul li a span,
    .autocomplete-wraper .autocomplete ul li a .autocomplete-anchor-label{
        display: block;
        margin-top: 3px;
        color: grey;
        font-size: 13px;
    }
    .autocomplete-wraper .autocomplete ul li a:hover .autocomplete-anchor-label,
    .autocomplete-wraper .autocomplete ul li.focus-list a span,
    .autocomplete-wraper .autocomplete ul li a:hover .autocomplete-anchor-label,
    .autocomplete-wraper .autocomplete ul li.focus-list a span{
        color: white;
    }
</style>
