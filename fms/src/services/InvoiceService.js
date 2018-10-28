import Api from '@/services/Api'

export default {
    fetchInvoices () {
      return Api().get('invoice')
    },
    fetchSituatieLucrari () {
      return Api().get('situatie-lucrari')
    },
    saveInvoice(payload) {
      return Api().post('invoice', payload)
    }
  }