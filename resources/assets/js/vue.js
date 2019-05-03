import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Loading from './bootstrap/ui/Loading'

Vue.use(Vuex);
Vue.use(VueResource);

Vue.http.interceptor.before = function () {
    window.Loading = Loading;
    Loading.on();
};

Vue.http.interceptors.push(function(request) {
   return function (response) {
       Loading.off();
   }
});

export default Vue;
