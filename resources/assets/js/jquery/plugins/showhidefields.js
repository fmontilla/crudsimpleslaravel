window.$fields = null;
function loadShowHideFields()
{    
    if ("undefined" == typeof ImobOn) var ImobOn = {};
    ImobOn.setcollapse = function (a, b, c) {
        document.getElementById("collapse-" + b) || (document.getElementById("container-collapse").innerHTML = '<div class="collapse fade" id="collapse-' + b + '"><iframe class="iframe" src="' + a + '" height="' + c + '" width="100%"></iframe></div>')
    }, Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
        var b = this.length >>> 0,
            c = Number(arguments[1]) || 0;
        for (c = c < 0 ? Math.ceil(c) : Math.floor(c), c < 0 && (c += b); c < b; c++) if (c in this && this[c] === a) return c;
        return -1
    }), jQuery && jQuery(document).ready(function (a) {
        var b = function (b) {
            var d, c = !0,
                limpar = false,
                e = b.data("showon");
            a.each(e, function (b, f) {
                limpar = e[b].limpar;
                $fields = a('' + e[b].field + ', ' + e[b].field + ''), e[b].valid = 0, $fields.each(function () {
                    d = ["checkbox", "radio"].indexOf(a(this).attr("type")) != -1 ? a(this).prop("checked") ? a(this).val() : "" : a(this).val(), "object" != typeof d && (d = JSON.parse('["' + d + '"]'));
                    for (var c in d) e[b].values.indexOf(d[c]) != -1 && (e[b].valid = 1)
                }), "" == e[b].op ? 0 == e[b].valid && (c = !1) : ("AND" == e[b].op && e[b].valid + e[b - 1].valid < 2 && (c = !1), "OR" == e[b].op && e[b].valid + e[b - 1].valid > 0 && (c = !0))
            });
            if(c) {
                b.slideDown();
            } else {
                if(limpar){
                    b.find('input, select, textarea').val('').change();
                }
                b.slideUp();
            }
        };

        
            a("[data-showon]").each(function () {
                var c = a(this),
                    d = a(this).data("showon");
                a.each(d, function (e, f) {
                    $fields = a('' + d[e].field + ', ' + d[e].field + ''), $fields.each(function () {
                        b(c)
                    }).bind("change.showon", function () {
                        b(c)
                    })
                })
            });
        

    });
}
loadShowHideFields()