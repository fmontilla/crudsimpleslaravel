

let Dialog = {

    open: function(params, event)
    {
        // Default parameters
        let _params = {
            id: 'Modal',
            title: null,
            icon: '',
            content: '',
            fnOk: null,
            textAlign: 'text-center',
            cancel: null,
            size: '',
            stopPropagation: false
        };

        // Verify if parameters is a string
        if(typeof params === 'string')
        {
            params = $.extend(true, _params, {content: params});
        }

        else
        {
            // Extende o parametro padrao
            params = $.extend(true, _params, params);
        }


        // Html com o conteudo da janela para o Alert'
        let html =
            '<div id="dialog' + params.id + '" class="modal" style="display: none">\
            <div class="modal-dialog' + (params.size ? ' modal-' + params.size : '') + '">\
                <div class="modal-content">';

        // Adiciona titulo caso exista
        if(params.title)
        {
            html +=
                '<div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>\
                    <h4 class="modal-title" id="dialogAlertTitle">' + params.title + '</h4>\
                    </div>';
        }

        // Corpo da Janela
        html += '<div class="modal-body ' + params.textAlign + '">';

        if(params.icon)
        {
            html += '<i class="fa ' + params.icon + '" style="font-size: 2.5em"></i>&nbsp;';
        }

        html += params.content;

        html += '</div>\
                    <div class="modal-footer text-center" style="padding-bottom: 5px">';

        // Adiciona botao de Cancelar se existe
        if(params.cancel)
        {
            html += '<button type="button" id="btDialog' + params.id + 'Cancel" class="btn btn-default" data-dismiss="modal"><i class="fa fa-close"></i>&nbsp;<b>Cancelar</b></button>';
        }

        // Botao Ok
        html +=
            '<button type="button" id="btDialog' + params.id + 'Ok" class="btn btn-primary"><i class="fa fa-check"></i>&nbsp;<b>Ok</b></button>\
                    </div>\
                </div>\
            </div>\
        </div>';

        // Adiciona elemento ao body
        $(html).appendTo($('body'));

        // Instancia Modal
        $('#dialog' + params.id).modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        })

        // Ao fechar modal
            .on('hidden.bs.modal', function()
            {
                $(this).remove(); // Remove modal do body

                // Chama funcao fechar se definida
                if(typeof params.onclose !== 'undefined')
                {
                    params.onclose();
                }
            });

        // Ao Clicar em Ok Chama Funcao de Ok caso exista
        $('#btDialog' + params.id + 'Ok').click(function()
        {
            // Esconde modal
            $('#dialog' + params.id).modal('hide');

            // Chama funcao Ok se existe
            if(params.fnOk)
            {
                params.fnOk();
            }
        })

        // Foca no botao Ok
        .toFocus();

        // Se stopPropagation
        if(params.stopPropagation && event)
        {
            event.cancelBubble = true;
        }

    },

    alert: function(params, event)
    {
        // Verifica se params eh uma string
        if(typeof params === 'string')
        {
            params = $.extend(true, params, {content: params});
        }

        // Extende o parametro padrao
        params = $.extend(true, params, {
            icon: 'fa-exclamation-triangle'
        });

        Dialog.open(params, event);
    },

    success: function(params, fnOk,event)
    {
        // Verifica se params eh uma string
        if(typeof params === 'string')
        {
            params = $.extend(true, params, {content: params,'fnOk': fnOk});
        }

        // Extende o parametro padrao
        params = $.extend(true, params, {
            icon: 'fa-check'
        });

        Dialog.open(params, event);
    },

    confirm: function(message, fnConfirm, fnCancel)
    {
        // Html Modal
        let html =
            '<div id="dialogConfirm" class="modal" style="display: none">\
                <div class="modal-dialog">\
                    <div class="modal-content">\
                        <div class="modal-body text-center">\
                            <h3><i class="fa fa-question-circle"></i>&nbsp;' + message + '</h3>\
                        </div>\
                        <div class="modal-footer text-center" style="padding-bottom: 5px">\
                            <div class="row">\
                                <div class="col-md-6 form-group">\
                                    <button type="button" id="btDialogConfirmYes" class="btn btn-primary btn-block"><i class="fa fa-check"></i>&nbsp;<b>Sim</b></button>\
                                </div>\
                                <div class="col-md-6 form-group">\
                                    <button type="button" id="btDialogConfirmNo" data-dismiss="modal" class="btn btn-default btn-block"><i class="fa fa-close"></i>&nbsp;<b>Não</b></button>\
                                </div>\
                            </div>\
                        </div>\
		            </div>\
                </div>\
            </div>';

        // Adiciona html ao body
        $(html).appendTo($('body'));

        // Instancia Modal
        $('#dialogConfirm').modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        })

        // Remove ao Fechar
        .on('hidden.bs.modal', function()
        {
            $(this).remove();
        });


        // Botao Ok
        $('#btDialogConfirmYes').click(function()
        {
            // Chama funcao Ok
            fnConfirm();

            // Esconde Modal
            $('#dialogConfirm').modal('hide');
        });


        // Botao cancelar
        $('#btDialogConfirmNo').click(function()
        {
            // Esconde
            $('#dialogConfirm').modal('hide');

            // Chama funcao cancelar se existe
            if(fnCancel)
            {
                fnCancel();
            }

        });

        // Foca botao no
        window.setTimeout(function()
        {
            $('#btDialogConfirmNo').focus();
        }, 50);

    }

};


export default Dialog;
