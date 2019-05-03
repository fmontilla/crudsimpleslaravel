(function($){
    $.fn.validaCep = function(options, action) {
        var $jquery = this;
        var formIndex;
        var configs = {
            'rua' : true,
            'bairro' : true,
            'cidade' : true,
            'uf' : true
        };
        var settings = $.extend({}, configs, options);
        var output = {
            'init': function() {
                $jquery.each(function() {

                    var form = this;
                    //Quando o campo cep perde o foco.
                    $('#cep', form).on('change', function(){
                        $(this).css({
                            "border": "1px solid #DDDDDD"
                        });
                        //console.log($('input[name=cep]',form).val());
                        //Nova variável com valor do campo "cep".
                        var cep = $(this).val();

                        //Verifica se campo cep possui valor informado.
                        if (cep != "") {

                            //Expressão regular para validar o CEP.
                            var validacep = /^[0-9]{5}-?[0-9]{3}$/;

                            //Valida o formato do CEP.
                            if(validacep.test(cep)) {

                                //Preenche os campos com "..." enquanto consulta webservice.
                                if(settings.rua == true)
                                    $('#endereco', form).val("...");

                                if(settings.bairro == true)
                                    $('#bairro', form).val("...");

                                if(settings.cidade == true)
                                    $('#cidade', form).val("...");

                                if(settings.uf == true)
                                    $('#estado', form).val("...");

                                //Consulta o webservice http://viacep.com.br/
                                $.getJSON("/api/admin/endereco/busca-cep?cep="+ cep, function(dados) {
                                    if (!("erro" in dados)) {
                                        //Atualiza os campos com os valores da consulta.
                                        if(settings.rua == true)
                                            $('#endereco', form).val(dados.logradouro).addClass('input_content');
                                        if(settings.bairro == true)
                                            $('#bairro', form).val(dados.bairro).addClass('input_content');   
                                        if(settings.cidade == true)
                                            $('#cidade', form).val(dados.localidade).addClass('input_content');   
                                        if(settings.uf == true)
                                            $('#estado', form).val(dados.uf).addClass('input_content');

                                        $('#endereco', form).prop('readonly', dados.logradouro);

                                        $('#bairro', form).prop('readonly', dados.bairro);

                                        $('#cidade', form).prop('readonly', dados.cidade);

                                        $('#estado', form).prop('readonly', dados.uf);

                                        $(form).trigger('retorno-api-cep',[dados]);

                                        //$("#ibge").val(dados.ibge);

                                    } //end if.
                                    else {
                                        //CEP pesquisado não foi encontrado.
                                        output.limpa_formulario_cep();
                                        $('#cep', form).css({
                                            "border": "2px solid red"
                                        });
                                        $('#cep', form).select();
                                    }
                                });
                            } //end if.
                            else {
                                //cep é inválido.
                                output.limpa_formulario_cep(form);
                                $('#cep', form).val('');

                                $('#cidade, #estado, #endereco, #bairro', form).val('');
                                //$('#cidade, #estado').hide();
                            }
                        } //end if.
                        else {
                            //cep sem valor, limpa formulário.
                            output.limpa_formulario_cep();
                        }
                    });


                });
            },
            'limpa_formulario_cep': function(form) {
                // Limpa valores do formulário de cep.
                if(settings.rua == true)
                    $('#endereco', form).val("");

                if(settings.bairro == true)
                    $('#bairro', form).val("");

                if(settings.cidade == true)
                    $('#cidade', form).val("");

                if(settings.uf == true)
                    $('#estado', form).val("");
            }
        };
        output.init();
        return output;
    };

})(jQuery);

