import Vue from 'vue'
import Vuex from 'vuex'
import InvoiceService from '@/services/InvoiceService'

Vue.use(Vuex);

export const invoices = new Vuex.Store({
    state: {
        invoices: []
    },
    getters: {
        
    },
    mutations: {
        storeInvoice: (state, payload) => {
            // console.log(payload)
            state.invoices = payload.data;
        }
    },
    actions: {
        async storeInvoice ({ commit }, context, payload) {
            commit('storeInvoice', await InvoiceService.fetchInvoices())
          }
    }
})