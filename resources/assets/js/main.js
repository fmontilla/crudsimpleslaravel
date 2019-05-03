
/*******/
//funções

//Retira os espaos do inicio e fim da string
function trim(str) {
	if (str != "") {
		return str.replace(/^\s+|\s+$/g, "");
	} else {
		return str;
	}
}

/**
 * converte um valor do tipo string para um número em float
 * @param  {string} valor [valor a ser convertido]
 * @return {float}       [valor convertido]
 */
function moedaParaNumero(valor) {
	valor = valor.replace(/[.]/g , "").replace(/[,]/g , ".");
	return parseFloat(valor.replace(/[^0-9.]/g, ''));
}

/**
 * [numeroParaMoeda description]
 * @param  {float} n [numero a converter]
 * @param  {int} c [numero de casas decimais]
 * @param  {string} d [separador decimal]
 * @param  {string} t [separador milhar]
 * @return {string}   [número formatado]
 */
function numeroParaMoeda(n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function validaURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?'+ // port
        '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
    return pattern.test(str);
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function string_to_slug (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

$(function () {

    $('#btn-toogle').on('click', function () {
        if ($('#menu').find('ul').hasClass('collapsed')) {
            $('#menu').animate({
                'left': '0%'
            },300,function () {
                $(this).addClass('expanded');
            });
            $('#menu > ul').removeClass('collapsed');
        } else {
            $('#menu > ul').addClass('collapsed');
        }
    });

	$('#menu').on('click', function () {
        $(this).removeClass('expanded')
        $(this).animate({
            'left': '-100%'
        })
        $(this).find('ul').addClass('collapsed');
        $('#main').addClass('main-collapsed');
    });

    $('#menu > ul.collapsed > li > a').on('click', function (e) {
        if ($('#menu > ul').hasClass('collapsed')) {
            $('#menu').css('left', '0px');
            $('#menu > ul').removeClass('collapsed');
            $('#main').removeClass('main-collapsed');
            e.stopImmediatePropagation();
            return false;
        }
    });

    $('#menu > ul.collapsed > li > span').on('click', function (e) {

        if ($('#menu > ul').hasClass('collapsed')) {
            $('#menu > ul').removeClass('collapsed');
            $('#main').removeClass('main-collapsed');
            return false;
        }

        var sub = $(this).parent().find('ul');
        if (sub.css('display') != 'none') {
            $(this).removeClass('collapsed');
            sub.hide(250);
        } else {
            $(this).addClass('collapsed');
            sub.show(250);
        }
        e.stopImmediatePropagation();
    });

    $('#menu > ul.collapsed > li > ul > li > a').on('click', function () {
        var link = $(this).attr('href');
        window.location.href = link;
        return false;
    });


});


/*
* Fixes Bootstrap modal
* */
$(document)

    .on('hide.bs.modal', '.modal', function (e) {
        let $modal = $(e.target);
        if ($modal.data('oldModal') && $modal.data('oldModal').data('bs.modal')) {
            $modal.data('oldModal').data('bs.modal').$backdrop.show();
            window.$oldModal = $modal.data('oldModal');
            $modal.removeData('oldModal');
        } else {
            window.$oldModal = null;
        }
        $('.info-help', e.target).popover('destroy');
    })

    .on('shown.bs.modal', '.modal', function (e) {
        let $modal = $(e.target);
        if (window.$oldModal) {
            let zIndex = parseInt(window.$oldModal.css('z-index'));
            window.$oldModal.data('bs.modal').$backdrop.hide();
            $modal.get(0).style.setProperty('z-index', zIndex + 2, 'important');
            $modal.data('bs.modal').$backdrop.get(0).style.setProperty('z-index', zIndex + 1, 'important');
            $modal.data('oldModal', window.$oldModal);
        }
        window.$oldModal = $modal;
    });



(function($) {
$(function(){
	/**
	 * Mascaras e validações
	 */
	/*****************************************************/
    //mascara para telefones de 8 e 9 dígitos
    var maskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    options = {onKeyPress: function(val, e, field, options) {
        field.mask(maskBehavior.apply({}, arguments), options);
        }
    };
    $('.telefone').mask(maskBehavior, options); //console.log('MAOE!!!!!!!', $('.telefone').length);
    /*****************************************************/
    $('.cep').mask("99999-999");
    $('.cpf').mask('999.999.999-99');
    $(".cnpj").mask("99.999.999/9999-99");
    $('.validOnlyNumber').wvmask('numero');
	$(".basic-select").select2();

	//remove a mascara de telefone caso o tipo selecionado for 3 = radio
	$(document).on('change', '.selectTipoTelefone', function(){
		if($(this).val() == '3')
		{
			$('input[name="telefone[numero][]"]', $(this).closest('.form-group')).unmask().removeClass('telefone');
		}else
		{
			$('input[name="telefone[numero][]"]', $(this).closest('.form-group')).mask(maskBehavior, options).addClass('telefone');;
		}
	});

	$(document).loadFinalidadeTipo({
		'selectFrom' : '.selectOptionsFinalidade',
		'selectTo' : '.selectOptionTipo'
	});

    //btn add tel cliente
    $(document).on('click', '.btnAddTel', function(){
    	var templateTel = $('.defaultTemplateTel').clone().removeClass('defaultTemplateTel').addClass('newTemplateTel');
    	$('input, textarea, select', templateTel).val('');
    	$('.btnAddTel i', templateTel).removeClass('fa-plus').addClass('fa-minus');
    	$('.btnAddTel', templateTel).removeClass('btnAddTel btn-primary').addClass('btnDelTel btn-danger');
    	$('.moreTels').append(templateTel);
    });
    //btn del tel cliente
    $(document).on('click', '.btnDelTel', function(){
    	$(this).closest('.newTemplateTel').remove();
    });

    //btn add email cliente
    $(document).on('click', '.btnAddEmail', function(){
    	var templateEmail = $('.defaultTemplateEmail').clone().removeClass('defaultTemplateEmail').addClass('newTemplateEmail');
    	$('input, textarea, select', templateEmail).val('');
    	$('.btnAddEmail i', templateEmail).removeClass('fa-plus').addClass('fa-minus');
    	$('.btnAddEmail', templateEmail).removeClass('btnAddEmail btn-primary').addClass('btnDelEmail btn-danger');
    	$('.moreEmails').append(templateEmail);
    });
    //btn del email cliente
    $(document).on('click', '.btnDelEmail', function(){
    	$(this).closest('.newTemplateEmail').remove();
    });

    var templateComissaoID = $(".templateComissao").length;

    $(document).on('change', 'input[name="repasse_promocao[]"][value=REPASSE]', function() {
		$('.templateFormaPagamento')[$(this).prop('checked') ? 'slideDown' : 'slideUp']();
	}).trigger('change');

	$(document).on('click','.openInModal', function(){
		var link = $(this).attr('href');
		$('#default-modal .modal-body').html('<iframe src="'+link+'" style="position:relative; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:500px; border:none; margin:0; padding:0; overflow:auto;">Seu navegador não suporta iframe</iframe>')
	
		$('#default-modal').modal('show');
		return false;
	});

    /**
     * Submit forms
     */
    //cliente cadastro
    $(document).on('submit', '#formCadastroUser', function(){
        $(this).submitForm({
            'reload' : true,
            'redirect' : '/admin'
        });
        return false;
    });
});
})(jQuery);
