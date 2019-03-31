import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Invoice from '@/components/Invoice'
import SitLucrari from '@/components/SitLucrari'
import Contract from '@/components/Contract'

Vue.use(Router)

export default new Router({
  hashbang: true,
  linkActiveClass: "active",
  transitionOnLoad: true,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Homepage
    },
    {
      path: '/factura',
      name: 'Factura',
      component: Invoice
    },
    {
      path: '/situatie-lucrari',
      name: 'Situatie lucrari',
      component: SitLucrari
    },
    {
      path: '/contract',
      name: 'Contracte',
      component: Contract
    }
  ]
})
