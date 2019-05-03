<template>
    <div ref="body" class="progress-tab">
        <slot></slot>
    </div>
</template>

<script>
    let $tabs;
    export default {
        props: {
          stepToStep: {
              type: Boolean,
              default: true
          }
        },
        data () {
            return {
                index: null,
                $tabs: null
            }
        },
        mounted () {
            this.init()
        },
        methods: {
            init() {
                const vueInstance = this;
                const $body = $(this.$refs['body']);
                $tabs = $(this.$refs['body']).children('a');
                $tabs.each(function (i) {
                    $(this).attr({
                        'aria-controls': $(this).attr('href').replace('#', ''),
                        'role': 'tab',
                        'data-toggle': 'tab',
                        'data-tab-index': i
                    });
                }).on('show.bs.tab', function (e) {
                    if ((vueInstance.stepToStep && !$(e.target).data('activeChangeTab')) || $(e.target).closest('.progress-tab').data('changeCancel')) {
                        e.preventDefault();
                        return false;
                    }
                    $tabs.removeClass('active');
                    $(this).addClass('active').prevAll().addClass('active');
                    vueInstance.$emit('tab', parseInt($(this).data('tab-index')), $(this));
                    vueInstance.index = parseInt($(this).data('tab-index'));
                });
                const $tab = $('<div class="progress-tabs"></div>');
                $body.append($tab.append($tabs));
                const $divs = $(this.$refs['body']).children('div[id]');
                const $tabContent = $('<div class="tab-content"></div>');
                $divs.attr('role', 'tabpanel').addClass('tab-pane fade');
                $tabContent.append($divs);
                $body.append($tabContent);
                $body.find('.active').data('activeChangeTab', true).tab('show').data('activeChangeTab', false);
                this.changeCssCursorTab(this.stepToStep);
            },
            next () {
                if (this.index < $tabs.length) {
                    $($tabs[this.index]).nextAll(':visible:first').data('activeChangeTab', true).tab('show').data('activeChangeTab', false);
                    return true
                }
                return false
            },
            previous () {
                if (this.index > 0) {
                    $($tabs[this.index]).prevAll(':visible:first').data('activeChangeTab', true).tab('show').data('activeChangeTab', false);
                    return true
                }
                return false
            },
            select (index) {
                if (index in $tabs) {
                    $($tabs[index]).data('activeChangeTab', true).tab('show').data('activeChangeTab', false);
                }
            },
            changeCssCursorTab(stepToStep) {
                $tabs.css('cursor', stepToStep ? 'default' : 'pointer')
            }
        },
        watch: {
            "stepToStep": function (value) {
                this.changeCssCursorTab(value)
            }
        }
    }
</script>

<style lang="scss">

    .progress-tab {
        position: relative;
        counter-reset: step;

        .progress-tabs {

            a {
                display: inline-block;
                text-align: center;
                text-transform: uppercase;
                counter-increment: step;
                font-size: .7em;
                font-weight: bold;
                background: white;
                position: relative;
                padding: 5px;
                width: 100px;
                vertical-align: top;

                &:before {
                    content: counter(step);
                    display: block;
                    width: 20px;
                    margin: 0 auto 10px;
                    z-index: 1;
                }

                &:link, &:hover, &:visited, &:active {
                    text-decoration: none;
                }

                &.active:before {
                    border-radius: 3px;
                    background: #27AE60;
                    color: white;
                }
            }
        }
    }

</style>