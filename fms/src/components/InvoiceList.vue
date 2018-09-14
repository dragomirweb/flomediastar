<template>
<div>
    <div class="w-100 mt-2">
        <div class="invoices">
        <b-list-group v-for="invoice in invoices" :key="invoice.id" class="d-flex">
            <b-list-group-item class="mb-2">
            <h3 class="text-monospace text-uppercase">{{ invoice.title }}</h3>
            <span class="mr-2">
                <b >Data: </b>
                {{ invoice.data }}
            </span>
            <div class="d-flex">
                <button class="btn btn-sm btn-success ml-auto"
                        @click="createPDF(invoice.title, invoice.data)"
                >
                        Salveaza
                </button>
                <button class="btn btn-sm btn-info ml-1">Editeaza</button>
                <button class="btn btn-sm btn-danger ml-1">Sterge</button>
            </div>
            </b-list-group-item>
        </b-list-group>
        </div>
    </div>
</div>
</template>

<script>
import jsPDF from 'jspdf'
import InvoiceService from '@/services/InvoiceService'

export default {
  name: 'InvoiceList',
  data () {
    return {
      invoices: [],
      indent: 10
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await InvoiceService.fetchInvoices()
      this.invoices = response.data
    },
    createPDF (pdfName, data) {
      var doc = new jsPDF();
      doc.text("titlu", 10, this.indent);
      doc.save(pdfName + '-' + data + '.pdf');
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>

</style>
