import Vue from "vue";
import Vuex from "vuex";
import InvoiceService from "@/services/InvoiceService";

Vue.use(Vuex);

export const invoices = new Vuex.Store({
  state: {
    invoices: [],
    sitLucrari: [],
    newInvoiceFromDetails: false,
    editInvoice: false
  },
  getters: {
    getInvoices: state => {
      return state.invoices;
    },
    gSituatieLucrari: state => {
      return state.sitLucrari;
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
    aSituatieLucrari({ commit }, payload) {
      commit("mSituatieLucrari", payload);
    },
    addNewInvoice({ commit }, payload) {
      commit("addNewInvoice", payload);
    },
    saveSituatieLucrari({ commit }, payload) {
      commit("saveSituatieLucrari", payload);
    },
    editExistingInvoice({ commit }, payload) {
      commit("editExistingInvoice", payload);
    },
    deleteInvoice({ commit }, payload) {
      commit("deleteInvoice", payload);
    },
    deleteStoredSituation({ commit }, payload) {
      commit("deleteSituation", payload);
    }
  },
  mutations: {
    storeInvoice: (state, payload) => {
      state.invoices = payload.data;
    },
    mSituatieLucrari: (state, payload) => {
      state.sitLucrari = payload;
    },
    addNewInvoice: (state, payload) => {
      state.invoices = [...state.invoices, payload];
      state.newInvoiceFromDetails = false;
    },
    saveSituatieLucrari: (state, payload) => {
      state.sitLucrari = [...state.sitLucrari, payload];
    },
    editExistingInvoice: (state, payload) => {
      // state.invoices = [...state.invoices, payload];
      console.log('edited an invoice')
    },
    deleteInvoice: (state, payload) => {
      const index = state.invoices.indexOf(payload);
      state.invoices.splice(index, 1);
    },
    deleteSituation: (state, payload) => {
      const index = state.sitLucrari.indexOf(payload);
      state.sitLucrari.splice(index, 1);
    },
  }
});
