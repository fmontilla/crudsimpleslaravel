//Retira os espaos do inicio e fim da string
window.trim = function (str) {
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
window.moedaParaNumero = function (valor) {
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
window.numeroParaMoeda = function (n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


window.validaURL = function (str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?'+ // port
        '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
    return pattern.test(str);
}

window.guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

window.string_to_slug = function (str) {
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