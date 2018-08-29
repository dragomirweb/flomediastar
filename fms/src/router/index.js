import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Invoice from '@/components/Invoice'

Vue.use(Router)

export default new Router({
  hashbang: false,
  mode: "history",
  linkActiveClass: "active",
  transitionOnLoad: true,
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/factura',
      name: 'Invoice',
      component: Invoice
    }
  ]
})
