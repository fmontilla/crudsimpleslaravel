let Notify = {

    messages: null,

    alert: function(messages, parameters)
    {
        this.show(messages, parameters, 'danger', 'fa-exclamation-triangle');
    },

    info: function(messages, parameters)
    {
        this.show(messages, parameters, 'info', 'fa-info-circle');
    },

    success: function(messages, parameters)
    {
        this.show(messages, parameters, 'success', 'fa-check');
    },

    show: function(messages, parameters = {}, type, icon)
    {
        this.messages = messages;
        if(typeof this.messages === 'string')
        {
            this.messages = [this.messages];
        }
        parameters['type'] = type

        $.each(this.messages, function(i, message)
        {
            window.setTimeout(function()
            {
                let zIndex = 1032;
                while ($('.modal:visible').filter(function () {
                    return parseInt($(this).css('z-index')) > zIndex;
                }).length !== 0) {
                    zIndex = parseInt($('.modal:visible').filter(function () {
                        return $(this).css('z-index') > zIndex;
                    }).css('z-index'));
                }
                parameters.z_index = zIndex;

                $.notify({
                    icon: 'fa ' + icon,
                    message: message
                }, parameters);

            }, i * 100);
        });

    }


};

module.exports = Notify;
