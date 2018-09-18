<template>
<div>
    <div class="w-100 mt-2">
        <div class="invoices">
            <b-list-group v-for="invoice in visibleInvoices" :key="invoice.id" class="d-flex">
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
                          PDF
                  </button>
                        <button class="btn btn-sm btn-info ml-1">Edit</button>
                        <button class="btn btn-sm btn-danger ml-1">Delete</button>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </div>
        <paginatron v-if="invoices.length>10" @change="updateItems" :items-per-page="5" :rotate="true" :items="invoices">
            <div slot-scope="{ setPage, nextPage, prevPage, page, pages, hasNextPage, hasPrevPage, nextButtonEvents, prevButtonEvents, nextButtonAttrs, prevButtonAttrs }">
                <div class="d-flex w-100 justify-content-center">
                  <button class="btn btn-md btn-primary mr-2" v-on="prevButtonEvents" v-bind="prevButtonAttrs" >Inapoi</button>
                
                  <button class="btn btn-md btn-primary" v-on="nextButtonEvents" >Urmatoarele</button>
                </div>
            </div>
        </paginatron>
    </div>
</div>
</template>

<script>
import jsPDF from 'jspdf'
import InvoiceService from '@/services/InvoiceService'
import Paginatron from 'vue-paginatron'

export default {
    name: 'InvoiceList',
    components: {
        "Paginatron": Paginatron
    },
    data() {
        return {
            invoices: [],
            indent: 10,
            currentPage: 1,
            perPage: 4,
            visibleInvoices: []
        }
    },
    mounted() {
        this.getInvoices()
    },
    methods: {
        async getInvoices() {
            const response = await InvoiceService.fetchInvoices()
            this.invoices = response.data;
        },
        createPDF(pdfName, data) {
            var doc = new jsPDF();
            doc.text("titlu", 10, this.indent);
            doc.save(pdfName + '-' + data + '.pdf');
        },
        updateItems(activeItems) {
            this.visibleInvoices = activeItems;
        }
    },
    computed: {

        updateInvoices() {
            this.visibleInvoices = this.invoices.slice(this.currentPage * this.perPage, (this.currentPage * this.perPage) + this.perPage)

            console.log('current page ' + this.currentPage)
            console.log('perpage ' + this.perPage)

        }
    }
}
</script>

<style lang="scss" scoped>

</style>
