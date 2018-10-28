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
    aInvoices({ commit }, payload) {
      commit("mInvoices", payload);
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
    mSituatieLucrari: (state, payload) => {
      state.sitLucrari = payload;
    },
    mInvoices: (state, payload) => {
      state.invoices = payload;
    },
    addNewInvoice: (state, payload) => {
      state.invoices = [...state.invoices, payload];
      state.newInvoiceFromDetails = false;
      //TODO: Save invoice in database
      InvoiceService.saveInvoice(payload);
    },
    saveSituatieLucrari: (state, payload) => {
      //TODO: Save situatie to db
      
      state.sitLucrari = [...state.sitLucrari, payload];
    },
    editExistingInvoice: (state, payload) => {
      // state.invoices = [...state.invoices, payload];
      //TODO: Update database
      console.log('edited an invoice')
    },
    deleteInvoice: (state, payload) => {
      const index = state.invoices.indexOf(payload);
      state.invoices.splice(index, 1);
      //TODO: delete db invoice
    },
    deleteSituation: (state, payload) => {
      const index = state.sitLucrari.indexOf(payload);
      state.sitLucrari.splice(index, 1);
      //TODO: Delete situation from db
    },
  }
});
