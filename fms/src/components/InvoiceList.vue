<template>
<div>
    <div class="w-100 mt-2">
        <div class="d-flex mt-4 mb-1" v-if="!showNewInvoice">
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
        <div class="invoices" v-if="!showNewInvoice">
            <div class="w-100 d-flex justify-content-center mt-5" v-if="filteredInvoices.length == 0">
                <h1 class="text-info">Nu s-au gasit facturi! &#x1F600;</h1>
            </div>
            <b-list-group v-for="(invoice, index) in filteredInvoices.slice(0, selected)" :key="invoice.id" class="d-flex">
                <b-list-group-item class="mb-2">
                    <h3 class="text-uppercase mb-0">{{ invoice.factura.factura }}</h3>
                    <h5 class="text-uppercase">{{ invoice.factura.firma }}</h5>
                    <span class="mr-2 text-grey">
                        <b>Factura emisa la: </b>
                        {{ invoice.factura.data | moment }}
                    </span>
                    <div class="d-flex">
                        <button @click="facturaNoua(invoice)" class="btn btn-sm btn-info ml-auto">Factura noua</button>
                        <button class="btn btn-sm btn-success ml-1"
                          @click="createPDF(invoice)"
                        >
                          PDF
                        </button>
                        <button class="btn btn-sm btn-info ml-1">Edit</button>
                        <button class="btn btn-sm btn-danger ml-1">Delete</button>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </div>
        <div class="factura-noua" v-if="showNewInvoice">
            <generate-invoice v-bind:newFactura="dataNewInvoice"> </generate-invoice>
        </div>
    </div>
</div>
</template>

<script>
import { pdf } from '../pdf/invoice.js'
import { mapGetters, mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import GenerateInvoice from '@/components/GenerateInvoice'
import _ from 'lodash'

export default {
    name: 'InvoiceList',
    components: {
        "Datepicker": Datepicker,
        "GenerateInvoice": GenerateInvoice
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
                { value: 5, text: 'Arata 5 Facturi'},
                { value: 10, text: 'Arata 10 Facturi'},
                { value: 15, text: 'Arata 15 Facturi'},
                { value: 20, text: 'Arata 20 Facturi'},
                { value: 50, text: 'Arata 50 Facturi'}
            ],
            showNewInvoice: false,
            dataNewInvoice: Object
        }
    },
    mounted() {
        this.assignInvoices()
    },
    updated() {
    },
    methods: {
        assignInvoices() {
           return this.invoices = this.getInvoices;
        },
        createPDF(data) {
            pdf(data)
        },
        clearSearch() {
            this.searchInvoice = '';
            this.dateSelected = true;
        },
        facturaNoua(inv) {
            this.showNewInvoice = true;
            this.dataNewInvoice = inv;
        }
    },
    computed: {
        ...mapGetters({
            getInvoices: 'getInvoices'
        }),
        filteredInvoices: function () {
            var vm = this
            var startDate = Date.parse(vm.searchInvoiceByDateStart);
            var endDate = Date.parse(vm.searchInvoiceByDateEnd);

            if (vm.searchInvoice != '') {
                return vm.invoices.filter((invoice) => {
                    return invoice.factura.factura.match(vm.searchInvoice) ||
                           invoice.factura.firma.match(vm.searchInvoice);
                });
            } else if (startDate <= endDate && vm.searchInvoice == '' && vm.dateSelected == true) {
                return _.filter(vm.invoices, (function (data) {
                    if ((_.isNull(startDate) && _.isNull(endDate))) {
                        return true
                    } else {
                        var date = Date.parse(data.factura.data);
                        return (date >= startDate && date <= endDate);
                    }
                }));
            } else {
                return _.filter(vm.invoices, (function (data) {
                    return true;
                }));
            };
        },

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
