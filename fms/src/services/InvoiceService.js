import Api from '@/services/Api'

export default {
    fetchInvoices () {
      return Api().get('invoice')
    }
  }