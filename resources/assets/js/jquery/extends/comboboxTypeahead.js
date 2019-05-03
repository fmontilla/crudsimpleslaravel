$.fn.extend({

    comboboxTypeahead: function()
    {
        return this.each(function()
        {
            var name = $(this).attr('name');
            $(this).removeAttr('name');
            $(this).change(function () {
                let $this = $(this);
                let val = $this.val();
                if (val) {
                    let $option     = $(':selected', this).hide();
                    let text        = $option.text();
                    let $paragraph  = $(`<p class="alert alert-info" data-val="${val}" hidden>${text}<span class="fa fa-close"></span><input type="hidden" name="${name}" value="${val}"></p>`);
                    $paragraph.click(function () {
                        $option.show();
                        $(this).hide('fast', function() {
                            $(this).remove();
                        });
                        $this.trigger('combobox-typeahead.remove', val);
                    });
                    $this.trigger('combobox-typeahead.select', val).parent().append($paragraph);
                    $(':first', this).prop('selected', true);
                    $paragraph.show('fast');
                }
            });
            var $this = $(this);
            $(this).closest('div').find('p[data-val]').each(function () {
                $this.find('option[value=' + $(this).data('val') + ']').hide();
                $(this).click(function () {
                    $this.find('option[value=' + $(this).data('val') + ']').show();
                    $(this).hide('fast', function() {
                        $(this).remove();
                    });
                    $this.trigger('combobox-typeahead.remove', $(this).data('val'));
                });
            });
        });
    }

});