const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .setPublicPath("./")
    .extract([
        'vue',
        'lodash',
        'jquery',
        'bootstrap-sass',
        'axios',
        'bootstrap-notify/bootstrap-notify.js'
    ])
    .autoload({
        jquery: ['$', 'window.jQuery', 'jQuery', 'jquery'],
    })
    .js([
        'resources/assets/js/app.js',
        'resources/assets/js/main.js',
        'resources/assets/js/libs/functions.js'
    ], 'public/js/app.js').version();
