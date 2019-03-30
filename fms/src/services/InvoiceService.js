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
    },
    updateInvoice(payload) {
      return Api().put('invoice', payload)
    },
    deleteInvoice(id) {
      return Api().delete('invoice', {
        params: { id: id }
        })
    },
    saveSituation(payload) {
      return Api().post('situatie-lucrari', payload)
    },
    deleteSituation(id) {
      return Api().delete('situatie-lucrari', {
        params: { id: id }
        })
    },
  }