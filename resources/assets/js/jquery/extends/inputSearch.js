(function($) {

    $.fn.inputSearch = function(options, action) {
        var $jquery = this;
        var form;
        var inputIndex = 0;
        var itemIndexResult = -1;
        var qtdItemsResult = 0;
        var configs = {
            beforeSearch: function(formData, jqForm, options) {},
            afterSearch: function() {},
            errorSearch: function(e) {console.log(e)},
            dataType: 'json',
            type: 'POST',
            data: {},
            minimumInputLength: 3,
            msgNotFound: 'Nenhum registro encontrado',
            templateRow: function(items){
                return '<div>'+
                            'REF.: '+items.referencia+'<br />'+
                            'Nome: '+items.nome+
                        '</div>';   
            }
        };
        var settings = $.extend({}, configs, options);
        var output = {
            'init': function() {
                $jquery.each(function() {

                    $(this).attr('indexInputSearch', inputIndex).wrap( '<div class="box-input-search" style="position: relative;"></div>' );

                    inputIndex++;
                    $(this).attr('autocomplete', 'off');
                    $(this).keyup(function(e) {

                        if(e.keyCode != 37 && e.keyCode != 39)
                        {
                            clearTimeout($(this).data('to'));
                            $(this).data('to', setTimeout($.proxy(function () {
                                switch(e.keyCode || e.which) {
                                    case 38: // key up ↑
                                        if (itemIndexResult > 0 && qtdItemsResult > 0) {
                                            itemIndexResult--;
                                            $('a.itemResultSearch').removeClass('focus');
                                            $('a.itemResultSearch:eq('+itemIndexResult+')').addClass('focus');
                                        }
                                        break;
                                    case 40: // key down ↓
                                        if (itemIndexResult < qtdItemsResult-1 && qtdItemsResult > 0) {
                                            itemIndexResult++;
                                            $('a.itemResultSearch').removeClass('focus');
                                            $('a.itemResultSearch:eq('+itemIndexResult+')').addClass('focus');
                                        }
                                        break;
                                    case 13: // enter ↵
                                        $('.boxSearchInput a.itemResultSearch').each(function(){
                                            if ($(this).hasClass('focus')) {
                                                $(this).trigger('click');
                                            }
                                        });
                                    break;
                                    default:
                                        if ($(this).val().length >= settings.minimumInputLength) {
                                            clearTimeout($.data(this, 'timer'));
                                            var wait = setTimeout(output.pesquisar($(this)), 500);
                                            $(this).data('timer', wait);
                                        }
                                }
                            }, this), 500));
                        }

                    });
                    $(this).focusout(function(e) {
                        setTimeout(function(){
                            $('.boxSearchInput').remove();
                        },
                        300);
                    });

                    $(this).focusin(function(event) {
                        itemIndexResult = -1;
                        $(this).closest('form').on('keyup keypress', function(e) {
                            var keyCode = e.keyCode || e.which;
                            if (keyCode === 13) {
                                e.preventDefault();
                                return false;
                            }
                        });
                    });

                });
            },
            'pesquisar': function(elm) {
                settings.data['termo'] = elm.val();
                $('.boxSearchInput').remove();
                $.ajax({
                    url: settings.url,
                    type: settings.type,
                    dataType: settings.dataType,
                    data: settings.data,
                    beforeSend: settings.beforeSearch
                })
                .done(function(data) {
                    // console.log(data)
                    var indexelm = elm.attr('indexInputSearch');
                    var helm = elm.innerHeight();
                    elm.after('<div class="boxSearchInput" id="box_'+indexelm+'" style="position: absolute; top: '+helm+'px;z-index: 2; min-width: 220px;"><div class="list-group" style="max-height: 200px; overflow: auto;"></div></div>');
                    var rows = '';
                    if(data.items.length > 0)
                    {
                        qtdItemsResult = data.items.length;
                        $.each(data.items, function(index, el) {
                            rows += '<a class="list-group-item itemResultSearch" data-index="'+index+'" style="cursor: pointer; padding: 5px;">'+
                                        settings.templateRow(el)+
                                    '</a>';
                        });


                        $(document)
                        .off( "click", '#box_'+indexelm+' .itemResultSearch' )
                        .one('click', '#box_'+indexelm+' .itemResultSearch', function(event) {
                            settings.afterSearch(data.items[$(this).data('index')], elm);
                            $('.boxSearchInput').remove();
                        });

                        $('.boxSearchInput .list-group').html(rows);
                    }else{
                        $('.boxSearchInput .list-group').html('<div class="list-group-item" style="padding: 5px;">'+settings.msgNotFound+'</div>');
                    }

                })
                .fail(settings.errorSearch);

            }
        };
        output.init();

        return output;
    };
})(jQuery);