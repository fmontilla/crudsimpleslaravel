function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }

    return true;
}
(function($) {
    $.fn.submitForm = function(options, action) {
        var $jquery = this;
        var form;
        var formIndex;
        var configs = {
            'beforeSubmit': function(formData, jqForm, options) {
                Loading.on();
                $('input, select, textarea', form).css('box-shadow', 'none');
                $('[name=submit]', form).attr('disabled', 'disabled');
                $('#alertMessageErrorForm'+formIndex+', .help-block').html('');
                return true;
            },
            'afterSubmit': function(data, status, xhr, $form) {
                $('input, select, textarea', form).css('box-shadow', 'none');
                $('#alertMessageErrorForm'+formIndex+', .help-block').html('');
                //try {
                    if (data != true) {
                        $.each(data, function(index, value) {
                            var value = '' + value;
                            var values = value.split(',');
                            $.each(values, function(id, val) {
                                console.log(val);
                                $('#alertMessageErrorForm'+formIndex).append('<li>' + val + '</li>');
                                if ($(".help-block", $('[name="' + index + '"]', form).parent()).length) {
                                    $(".help-block", $('[name="' + index + '"]', form).parent()).html(val);
                                }else{
                                    $('[name="' + index + '"]', form).after('<p class="help-block" id="'+index+'">'+val+'</p>');
                                }

                            });
                            $('[name="' + index + '"]', form).css('box-shadow', '0 0 1px 1px #F00');
                            
                        });
                        $('#alertMessageErrorForm'+formIndex).removeClass('hide');
                        $('html, body, #main').animate({
                        scrollTop: $('.formMessageError').offset().top
                        }, 1000);
                        $('[name=submit]', form).removeAttr('disabled');
                        return false;
                    } else {

                        Loading.off();
                        $('#modalConfirmationMessage').remove();
                        if(settings.confirmationmessage != null)
                        {
                            $('body').append('  <div id="modalConfirmationMessage" class="modal fade" tabindex="-1" role="dialog">'+
                                                    '<div class="modal-dialog" role="document">'+
                                                        '<div class="modal-content">'+
                                                            '<div class="modal-header text-center">'+
                                                                '<h4 class="modal-title">Mensagem de confirmação</h4>'+
                                                            '</div>'+
                                                            '<div class="modal-body text-center">'+
                                                                settings.confirmationmessage+
                                                            '</div>'+
                                                            '<div class="modal-footer">'+
                                                                '<button type="button" class="btn btn-default" data-dismiss="modal" onclick="location.reload()">Não</button>'+
                                                                '<a href="'+settings.redirect+'" class="btn btn-primary">Sim</button>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>');
                            $('#modalConfirmationMessage').modal('show');
                            return false;
                        }

                        //$("#img_previous", form).attr('src', '');
                        if (settings.reload == true) location.reload();
                        if (settings.redirect != null) location.href = settings.redirect
                        if (settings.resetform == true) form.get(0).reset();
                        $('[name=submit]', form).removeAttr('disabled');
                        return true;
                    }
                //} catch (e) {
                //    console.log(e)
                //    console.log(data)
                    //$('#alertMessageErrorForm'+formIndex).html(e);
                //}
                Loading.off();
                return true;
            },
            errorSubmit: function(e) {
                console.log(e)
                $('input, select, textarea', form).css('box-shadow', 'none');
                $('#alertMessageErrorForm'+formIndex+', .help-block').html('');
                settings.clearForm = false;
                settings.resetform = false;
                if( isJson(e.responseText) )
                {
                    var obj = jQuery.parseJSON( e.responseText );

                    $.each(obj.errors, function(index, value) {
                        var value = '' + value;
                        var values = value.split(',');
                        $.each(values, function(id, val) {
                            console.log(val);
                            $('#alertMessageErrorForm'+formIndex).append('<li>' + val + '</li>');
                            if ($(".help-block", $('[name="' + index + '"]', form).parent()).length) {
                                $(".help-block", $('[name="' + index + '"]', form).parent()).html(val);
                            }else{
                                $('[name="' + index + '"]', form).after('<p class="help-block" id="'+index+'">'+val+'</p>');
                            }

                        });
                        $('[name="' + index + '"]', form).css('box-shadow', '0 0 1px 1px #F00');
                        

                    });
                }else
                {
                    $('#alertMessageErrorForm'+formIndex).html(e.responseText);
                }

                $('#alertMessageErrorForm'+formIndex).removeClass('hide');

                $('html, body, #main').animate({
                scrollTop: $('.formMessageError').offset().top
                }, 1000);

                $('[name=submit]', form).removeAttr('disabled');
                Loading.off();
            },
            'dataType': 'json',
            'redirect': null,
            'resetform': false,
            'clearForm': false,
            'reload': false,
            'parameters': {},
            'autoSubmit': true,
            'confirmationmessage': null
        };
        var settings = $.extend({}, configs, options);
        var output = {
            'init': function() {
                $jquery.each(function() {
                    form = $(this);
                    formIndex = form.index();
                    $('.formMessageError').remove();
                    var contentpanel = '<ul class="alert alert-danger formMessageError hide" id="alertMessageErrorForm'+formIndex+'"></ul>';
                    form.before(contentpanel);
                });
            },
            'submitForm': function(data) {
                var submitData = {
                    beforeSubmit: settings.beforeSubmit,
                    success: settings.afterSubmit,
                    url: form.attr('action'),
                    dataType: settings.dataType,
                    clearForm: (settings.afterSubmit == true) ? settings.clearForm : false,
                    resetForm: (settings.afterSubmit == true) ? settings.resetform : false,
                    data: settings.parameters,
                    error: settings.errorSubmit
                };
                if  (options.formData) {
                    submitData.formData = options.formData;
                }
                form.ajaxSubmit(submitData);
            }
        };
        output.init();
        if (settings.autoSubmit == true) output.submitForm();
        return output;
    };
})(jQuery);