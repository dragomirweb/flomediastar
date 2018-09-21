<template>
<div>
    <div class="w-100 mt-2">
        <div class="d-flex my-4">
            <div class="d-flex align-items-end w-50 mr-2">
                <b-form-input @click="clearSearch" v-model="searchInvoice" type="text" placeholder="Cauta factura"></b-form-input>
            </div>
            <div class="w-50 d-flex">
                <datepicker class="mr-1" :bootstrap-styling="true" @closed="clearSearch" v-model="searchInvoiceByDateStart">
                </datepicker>
                <datepicker :bootstrap-styling="true" @closed="clearSearch" v-model="searchInvoiceByDateEnd"></datepicker>
            </div>
        </div>
        <div class="invoices">
            <b-list-group v-for="invoice in filteredInvoices" :key="invoice.id" class="d-flex">
                <b-list-group-item class="mb-2">
                    <h3 class="text-monospace text-uppercase">{{ invoice.title }}</h3>
                    <h5 class="text-monospace text-uppercase">{{ invoice.client }}</h5>
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
    </div>
</div>
</template>

<script>
import jsPDF from 'jspdf'
import InvoiceService from '@/services/InvoiceService'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import _ from 'lodash'

export default {
    name: 'InvoiceList',
    components: {
        "Datepicker": Datepicker
    },
    data() {
        return {
            invoices: [],
            indent: 10,
            searchInvoice: '',
            searchInvoiceByDateStart: new Date(),
            searchInvoiceByDateEnd: new Date(),
            dateSelected: false,
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
        clearSearch() {
            this.searchInvoice = '';
            this.dateSelected = true;
        }
    },
    computed: {
        filteredInvoices: function () {
            var vm = this
            var startDate = Date.parse(vm.searchInvoiceByDateStart);
            var endDate = Date.parse(vm.searchInvoiceByDateEnd);

            if (vm.searchInvoice != '') {
                return vm.invoices.filter((invoice) => {
                    return invoice.title.match(vm.searchInvoice) ||
                        invoice.client.match(vm.searchInvoice);
                });
            } else if (startDate <= endDate && vm.searchInvoice == '' && vm.dateSelected == true) {
                return _.filter(vm.invoices, (function (data) {
                    if ((_.isNull(startDate) && _.isNull(endDate))) {
                        return true
                    } else {
                        var date = Date.parse(data.data);
                        return (date >= startDate && date <= endDate);
                    }
                }));
            } else {
                return _.filter(vm.invoices, (function (data) {
                    return true;
                }));
            };
        },

    }
}
</script>

<style lang="scss" scoped>

</style>
