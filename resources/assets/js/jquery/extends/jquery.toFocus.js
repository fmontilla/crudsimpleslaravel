/**
 * Funcoes extendidas para os elements jquery
 * @param {type} param
 */
$.fn.extend({


    /**
     * Time out wait to focus
     * @return void
     */
    toFocus: function()
    {
        return this.each(function ()
        {
            let $this = $(this);
            window.setTimeout(function(){$this.focus()}, 10);
        });
    }

});