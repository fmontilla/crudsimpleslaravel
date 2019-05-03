const Notify = require('./Notify');

let Validator = {

    errors: undefined,
    errorsNotify: [],
    form: undefined,
    categories: null,

    showErrors: function(arg0, arg1, arg2)
    {
        this.errors = arg0;
        this.form = arg2 || arg1;

        this.normalizeErrors();
        this.resetForm();


        this.parseErrors();

        this.errors = undefined;
        this.errorsNotify = [];
        this.form = undefined;
        this.categories = null;

    },



    resetForm: function(form)
    {
        if(!form) form = this.form;

        if(typeof form !== 'object')
        {
            form = $('form');
        }

        if(typeof this.resetElements === 'string')
        {
            this.resetElements = $(this.resetElements);
            form = $(this.resetElements).closest('form');
        }

        let $validatorMsgs = this.resetElements ? $('span.validator-msgs', this.resetElements.closest('.container-validator-msgs')) : $('span.validator-msgs');
        // Destroy popup, remove msgs
        $validatorMsgs
            .popover('hide')
            .popover('destroy')
            .removeData('msg')
            .remove();

        let formValidatorMsgs;
        if(this.resetElements)
        {
            formValidatorMsgs = form.find(this.resetElements);
        }
        else
        {
            formValidatorMsgs = form.find('.validator-msgs');
        }

        formValidatorMsgs
            .removeData('msg')
            .popover('destroy')
            .off('blur.popover')
            .removeClass('validator-msgs');

        let formContainerValidatorMsgs;
        if(this.resetElements)
        {
            formContainerValidatorMsgs = form.find(this.resetElements).map(function()
            {
                return $(this).closest('.container-validator-msgs');
            });
        }
        else
        {
            formContainerValidatorMsgs = form.find('.container-validator-msgs');
        }

        formContainerValidatorMsgs.each(function()
        {
            $(this).removeClass('has-error container-validator-msgs');
        });
        this.resetElements = null;
    },


    /**
     * Normaliza mensagens de erros para permitir outros tipos de parametros na funcao showErrors
     * Podendor ser category, error, ou apenas error
     * @returns {undefined}
     */
    normalizeErrors: function()
    {
        // Verifica se errors eh string
        if(typeof this.errors === "string")
        {
            // Verifica se form eh undefined
            if(this.form === undefined)
            {
                this.errors = {"error": [this.messages]};
            }

            // Verifica se o form eh uma string ou uma instancia de um Array
            else if(typeof this.form === "string" || this.form instanceof Array)
            {
                let errors = {};
                errors[this.errors] = typeof this.form === "string" ? [this.form] : this.form;
                this.errors = errors;
                this.form = undefined;
            }

        }

    },


    parseErrors: function()
    {
        let validator = this;

        for(let category in this.errors)
        {
            let $categories = validator.getCategories(category);
            let messages = this.errors[category];
            if(typeof messages === 'string')
            {
                messages = [messages];
            }

            // Verifica se encontrou categoria
            if($categories.length)
            {
                $categories.each(function()
                {
                    let $category = $(this);

                    // Verifica se eh uma tr
                    if($category.is('tr'))
                    {
                        validator.parseErrorTable($category, messages);
                    }

                    // Nao eh tr
                    else
                    {
                        validator.parseErrorDefault($category, messages);
                    }

                });
            }

            // Mensagens grow
            else
            {
                validator.addErrorsNotify(messages);
            }

        }


        this.buildErrors();
    },


    getCategories: function(category)
    {
        //

        window.$categories = (
            typeof this.form === 'undefined'
                ?
                $('*[data-category], *[name]')
                :
                $('*[data-category], *[name]', this.form)
        );

        // Filtra para trazer apenas categoria
        this.categories = $categories.filter(function()
        {
            let categories = ($(this).attr('data-category') || '').split(' ');
            return _.includes(categories, category) || ($(this).attr('name') || '') === category;
        });
        return this.categories;
    },


    parseErrorTable: function($category, messages)
    {
        // Verifica se nao possui msgs
        if(!$category.children('td:first:visible').find('.validator-msgs').length)
        {
            $category
                .addClass('container-validator-msgs')
                .children('td:first:visible')
                .prepend('\
                    <span class="validator-msgs">\
                        <i class="fa fa-exclamation-triangle"></i>\
                        &nbsp;\
                        &nbsp;\
                    </span>\
                ');
        }

        // Verifica se nao existe array de msg
        if(typeof $category.find('.validator-msgs').data('msgs') === 'undefined')
        {
            // Adiciona array de mensagens
            $category.find('.validator-msgs').data('msgs', messages);
        }

        // Adiciona mensagens
        this.addErrorsNotify(messages);
    },


    parseErrorDefault: function($category, messages)
    {
        let $container = $category.closest('.form-group, .ui-select, td, .checkbox, .checkbox-inline');
        $container.addClass('container-validator-msgs has-error');

        if(!$container.find('.validator-msgs').length)
        {
            $category.addClass('validator-msgs').data('msgs', messages);
        }

        // Verifica se a categoria nao esta visivel
        if(!$category.is(':visible') && !$category.closest('.tab-pane:not(.active)').length)
        {
            this.addErrorsNotify(messages);
        }
    },


    addErrorsNotify: function(messages)
    {
        this.errorsNotify = this.errorsNotify.concat(messages);
    },


    buildErrors: function()
    {
        this.getContainers().each(function()
        {
            let $container = $(this);

            // Parametros do popup
            let paramsPopup = {
                content: $container
                    .find('.validator-msgs')
                    .data('msgs')
                    .join('<br />'),
                html: true,
                trigger: 'manual',
                animation: false
            };


            // Verifica se eh tr
            if($container.is('tr'))
            {
                // Adiciona propriedades para trs
                $.extend(paramsPopup, {
                    placement: 'right'
                }, true);

                $container.click(function(e)
                {
                    e.stopPropagation();
                });
            }

            // Nao eh tr
            else
            {
                // Adiciona propriedades
                $.extend(paramsPopup, {
                    placement: 'top'
                });
            }

            // popup com os erros
            $container
                .find('.validator-msgs')
                .popover(paramsPopup)
                .on('blur.popover', function()
                {
                    $(this).popover('hide');
                })
                .on('focus.popover', function()
                {
                    $(this).popover('show');
                });

        });

        // Verifica se ha mensagens grow
        if(this.errorsNotify.length)
        {
            Notify.alert(this.errorsNotify);
        }

        // Se nao procura por category em tabs
        else
        {
            let $firstCategory = this.getContainers().first().find('.validator-msgs:eq(0)');


            // Verifica se esta dentro de uma tab
            let $tab = $firstCategory.closest('.tab-pane:not(.active)');


            // Se encontrou tab entao exibe a
            if($tab.length)
            {
                $('a[href="#' + $tab.attr('id') + '"]').tab('show');
            }

            // Foca category
            window.setTimeout(function(){
                $firstCategory.focus();
                $firstCategory.popover('show');
            }, 500);


        }

    },


    getContainers: function()
    {
        return (
            typeof this.form === 'undefined'
                ?
                $('.container-validator-msgs')
                :
                $('.container-validator-msgs', this.form)
        );
    }

};

module.exports = Validator;
