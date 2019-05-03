window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
try {
    window.$ = require('jquery');
    global.jQuery = window.$;
    window.moment = require('moment');
    require('bootstrap-sass/assets/javascripts/bootstrap');

    require('meiomask/src/meiomask');
    require('jquery-mask-plugin');
    require('bootstrap-notify/bootstrap-notify.js');
    require('bootstrap-datepicker');
    require('bootstrap-datepicker/js/locales/bootstrap-datepicker.pt-BR');
    require('eonasdan-bootstrap-datetimepicker');

    // Prototypes
    // require('./prototype/String');
    // require('./prototype/Number');
    // require('./prototype/Image');

    // jquery extends
    require('./jquery/extends/jquery.toFocus');
    require('./jquery/extends/inputSearch');
    require('./jquery/extends/jquery.loadFinalidadeTipo');
    require('./jquery/extends/submitForm');

    window.Hashtable       = require('./libs/hashtable');

    // jquery plugins
    require('./jquery/plugins/jquery.form');
    require('./jquery/plugins/jquery.validate');
    require('./jquery/plugins/jquery.numberformatter');
    require('./jquery/plugins/showhidefields');

    // Vue directives


    // Bootstrap Extras
    window.Notify      = require('./bootstrap/ui/Notify');
    window.Dialog      = require('./bootstrap/ui/Dialog');
    window.Loading     = require('./bootstrap/ui/Loading');
    window.Validator   = require('./bootstrap/ui/Validator');

    // Javascript Dependencies

    window.asyncWaterfall   = require('async-waterfall');
    window.Cropper          = require('./libs/cropper');
    window._                = require('lodash');

    require('./bootstrap/fixes');

} catch (e) {
    console.log(e);
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

const token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': token
    }
});

$(document).on('submit', 'form', function () {
    Validator.resetForm($(this));
});

String.prototype.toMoment = function(){
    const format = [
        'DD/MM/YYYY HH:mm'.slice(0, this.length),
        'DD/MM/YYYY'.slice(0, this.length),
        'YYYY-MM-DD HH:mm'.slice(0, this.length),
        'YYYY-MM-DD'.slice(0, this.length),
    ]
    const data = moment(this, format)

    return data.isValid() ? data : null;
};

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
