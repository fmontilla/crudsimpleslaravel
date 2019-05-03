/**
 * Plugin para retornar os tipos de imóveis conforme a seleção da finalidade
 */
(function($) {
    $.fn.loadFinalidadeTipo = function(options, action) {
        var $jquery = this;
        var configs = {
            'selectFrom': '',
            'selectTo': ''
        };
        var settings = $.extend({}, configs, options);
        var output = {
            'init': function() {
                $jquery.each(function() {

                    $(this).on('change', settings.selectFrom, function(){
                        var idFinalidade = $(this).val();
                        $.ajax({
                            url: BASEURL+'/admin/finalidade-imovel/tipos',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                _token : $('meta[name="csrf-token"]').attr('content'),
                                idFinalidade: idFinalidade
                            },
                            beforeSend:function(){
                                $(settings.selectTo).html('<option value="">Carregando...</option>')
                            }
                        })
                            .done(function(data) {
                                //console.log(data);
                                $(settings.selectTo).html('')
                                $.each(data,function(index, value){
                                    $(settings.selectTo).append('<option value="'+value.id+'">'+value.nome+'</option>')
                                })
                                $(settings.selectTo).removeAttr('readonly').change();
                            })
                            .fail(function(e) {
                                console.log(e.responseText);
                            });
                    });
                });
            }
        };
        output.init();
        return output;
    };
})(jQuery);