$.fn.extend({


    /**
     * Time out wait to focus
     * @return void
     */
    nameValues: function()
    {
        return this.each(function()
        {
            $('input, textarea', this).each(function() {
                var $nome;
                switch ($(this).attr('type')) {
                    case 'checkbox':
                        $nome = $('<input type="hidden" name="nome_' + $(this).attr('name') + '">');
                        $(this).change(function() {
                            if ($(this).prop('checked')) {
                                $(this)
                                    .after($nome.val($.trim($(this).parent().text())))
                                    .after('<input type="hidden" name="descr_' + $(this).attr('name') + '" value="Sim">');
                            } else {
                                $(this).next('input[name^=nome]').remove();
                            }
                        }).trigger('change');
                        break;
                    case 'radio':
                        if (!$(this).closest('form').find('input[name=nome_' + $(this).attr('name') + ']').length) {
                            $nome = $('<input type="hidden" name="nome_' + $(this).attr('name') + '">');
                            $(this).after($nome.val($.trim($(this).attr('title'))));
                        }
                        break;
                    default:
                        if ($(this).attr('type') !== 'hidden') {
                            $nome = $('<input type="hidden" name="nome_' + $(this).attr('name') + '">');
                            $(this).after($nome.val($(this).attr('placeholder')))
                        }
                }
            });

            $('select', this).each(function () {
                var $name = $('<input type="hidden" name="nome_' + $(this).attr('name') + '" value="' + $(this).find('option:first').text() + '">');
                var $descr = $('<input type="hidden" name="descr_' + $(this).attr('name') + '">');
                $(this).after($descr).change(function () {
                    $descr.val($(this).val() ? $(':selected', this).text() : '');
                }).trigger('change');
                $(this).after($name);
            });
        });
    }

});
