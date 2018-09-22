<template>
<div>
    <div class="w-100 mt-2">
        <div class="d-flex mt-4 mb-1">
            <div class="d-flex w-50 mr-2">
                <b-form-input @click="clearSearch" v-model="searchInvoice" type="text" placeholder="Cauta factura"></b-form-input>
            </div>
            <div class="w-25 d-flex mr-2">
                <datepicker class="mr-1" :bootstrap-styling="true" @closed="clearSearch" v-model="searchInvoiceByDateStart">
                </datepicker>
                <datepicker :bootstrap-styling="true" @closed="clearSearch" v-model="searchInvoiceByDateEnd"></datepicker>
            </div>
            <div class="w-25 d-flex">
                <b-form-select v-model="selected" :options="showInvoices" class="mb-3" />
            </div>
        </div>
        <div class="invoices">
            <div class="w-100 d-flex justify-content-center mt-5" v-if="filteredInvoices.length == 0">
                <h1 class="text-info">Nu s-au gasit facturi! &#x1F600;</h1>
            </div>
            <b-list-group v-for="invoice in filteredInvoices.slice(0, selected)" :key="invoice.id" class="d-flex">
                <b-list-group-item class="mb-2">
                    <h3 class="text-uppercase mb-0">{{ invoice.title }}</h3>
                    <h5 class="text-uppercase">{{ invoice.client }}</h5>
                    <span class="mr-2 text-grey">
                        <b>Factura emisa la: </b>
                        {{ invoice.data | moment }}
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
            showItems: 1,
            selected: 5,
            showInvoices: [
                { value: 5, text: 'Arata 5 Facturi' },
                { value: 10, text: 'Arata 10 Facturi' },
                { value: 15, text: 'Arata 15 Facturi' },
                { value: 20, text: 'Arata 20 Facturi' },
                { value: 50, text: 'Arata 50 Facturi'}
            ]
        }
    },
    mounted() {
        this.getInvoices()
    },
    updated() {
    },
    methods: {
        async getInvoices() {
            const response = await InvoiceService.fetchInvoices()
            this.invoices = response.data;
        },
        createPDF(pdfName, data) {
            var doc = new jsPDF();
            doc.text("titlu", 10, this.indent);
            doc.save(pdfName.toUpperCase() + '-' + moment(data).format('D-M-YYYY') + '.pdf');
        },
        clearSearch() {
            this.searchInvoice = '';
            this.dateSelected = true;
        },
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
        }

    },
    filters: {
        moment: function (date) {
            return moment(date).format('D-M-YYYY');
        }
    }
}
</script>

<style lang="scss" scoped>
    .text-grey {
        color: darkgrey;
    }
</style>
