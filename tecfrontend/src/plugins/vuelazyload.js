import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
    loading: 'http://localhost:3000/public/images/loading.gif',
    error: 'http://localhost:3000/public/images/loading.gif'
})