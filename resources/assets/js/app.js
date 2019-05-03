/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// Vue
import Vue from './vue'
import store from './store'
import './directives/mask'
import ToggleButton from 'vue-js-toggle-button'
import { EnhancedCheck } from 'vue-enhanced-check'
import BootstrapToggle from 'vue-bootstrap-toggle'
import VueJsBootstrapResources from 'vue-js-bootstrap-resources'
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'

Vue.use(ToggleButton);
Vue.use(VueJsBootstrapResources);
Vue.use(Autocomplete);

window.Vue = Vue;
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
Vue.prototype._ = require('lodash');

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('enhanced-check', EnhancedCheck);
Vue.component('switches', require('vue-switches'));
Vue.component('progress-tab', require('./components/bootstrap/ProgressTab.vue'));

Vue.component('bootstrap-toggle', BootstrapToggle);
// Vue.component('input-autocomplete', require('./components/bootstrap/InputAutocomplete.vue'));

Vue.component('list', require('./components/bootstrap/List.vue').default);

Vue.component('medico-form', require('./components/medicos/Form.vue').default);


const app = new Vue({
    el: '#content',
    store
});
