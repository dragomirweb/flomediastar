// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { invoices } from './store/invoices'

Vue.use(BootstrapVue)
Vue.use(require('vue-moment'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: invoices,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
