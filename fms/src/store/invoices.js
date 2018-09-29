import Vue from "vue";
import Vuex from "vuex";
import InvoiceService from "@/services/InvoiceService";

Vue.use(Vuex);

export const invoices = new Vuex.Store({
  state: {
    invoices: [],
    newInvoiceFromDetails: false,
    editInvoice: false
  },
  getters: {
    getInvoices: state => {
      return state.invoices;
    },
    newInvoiceFromDetails: state => {
      return state.newInvoiceFromDetails;
    },
    editInvoice: state => {
      return state.editInvoice;
    }
  },
  actions: {
    async storeInvoice({ commit }, context, payload) {
      commit("storeInvoice", await InvoiceService.fetchInvoices());
    },
    addNewInvoice({ commit }, payload) {
      commit("addNewInvoice", payload);
    },
    editExistingInvoice({ commit }, payload) {
      commit("editExistingInvoice", payload);
    }
  },
  mutations: {
    storeInvoice: (state, payload) => {
      state.invoices = payload.data;
    },
    addNewInvoice: (state, payload) => {
      state.invoices = [...state.invoices, payload];
      state.newInvoiceFromDetails = false;
    },
    editExistingInvoice: (state, payload) => {
      state.invoices = [...state.invoices, payload];
    }
  }
});
