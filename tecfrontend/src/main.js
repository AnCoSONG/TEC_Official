import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/vuelazyload'

import _$ from 'jquery'
import easing from 'jquery.easing'



Vue.prototype.$ = _$;
window.$ = _$;

// Vue.prototype.easing = easing($)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')