<template>
<div>
    <div class="w-100 mt-2">
        <div class="d-flex flex-column flex-md-row mt-4 mb-1" v-if="!newInvoiceFromDetails && !editInvoice">
            <div class="d-flex w-100 mb-2 mb-md-0 mr-md-2">
                <b-form-input @click="clearSearch" v-model="searchInvoice" type="text" placeholder="Cauta factura"></b-form-input>
            </div>
            <div class="w-100 d-flex mb-2 mb-md-0 mr-md-2">
                <datepicker class="mr-1" :bootstrap-styling="true" @closed="clearSearch" v-model="searchInvoiceByDateStart">
                </datepicker>
                <datepicker :bootstrap-styling="true" @closed="clearSearch" v-model="searchInvoiceByDateEnd"></datepicker>
            </div>
            <div class="w-100 mb-2 mb-md-0 d-flex">
                <b-form-select v-model="selected" :options="showInvoices" class="mb-3" />
            </div>
        </div>
        <div class="invoices" v-if="!newInvoiceFromDetails && !editInvoice">
            <div class="w-100 d-flex justify-content-center mt-5" v-if="filteredInvoices.length == 0">
                <h1 class="text-info">Nu s-au gasit facturi! &#x1F600;</h1>
            </div>
            <b-list-group v-for="(invoice, index) in filteredInvoices.slice(0, selected)" :key="invoice.id" class="d-flex">
                <b-list-group-item class="mb-2">
                    <h3 class="text-uppercase mb-0">Factura: {{ invoice.factura.factura }}</h3>
                    <h5 class="text-uppercase">Firma: {{ invoice.factura.firma }}</h5>
                    <span class="mr-2 text-grey">
                        <b>Factura emisa la: </b>
                        {{ invoice.factura.data | moment }}
                    </span>
                    <div>
                        <span class="mr-2 text-grey">
                        <b>Total: </b>
                        {{ invoice.factura.totalFactura}}
                    </span>
                    </div>
                    <div>
                        <span class="mr-2 text-grey">
                        <b>Total + TVA: </b>
                        {{ invoice.factura.totalFacturaPlusTva}}
                    </span>
                    </div>
                    <div class="d-flex flex-column flex-md-row mt-3 mt-md-0">
                        <button @click="facturaNoua(invoice)" class="btn btn-sm btn-info mb-2 mb-md-0 ml-md-auto">Factura cu datele existente</button>
                        <button class="btn btn-sm btn-success mb-2 mb-md-0 ml-md-1"
                          @click="createPDF(invoice)"
                        >
                          PDF
                        </button>
                        <button class="btn btn-sm btn-success mb-2 mb-md-0 ml-md-1"
                          @click="createChitanta(invoice)"
                        >
                          Chitanta
                        </button>
                        <button @click="editeazaFactura(invoice)" class="btn btn-sm btn-info mb-2 mb-md-0 ml-md-1">Edit</button>
                        <button @click="deleteInvoiceModalShow(invoice)" class="btn btn-sm btn-danger mb-2 mb-md-0 ml-md-1">Delete</button>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </div>
        <div class="factura-noua" v-if="newInvoiceFromDetails">
            <generate-invoice invAction="newInvoice" v-bind:newFactura="dataNewInvoice"> </generate-invoice>
        </div>
        <div class="factura-noua" v-if="editInvoice">
            <generate-invoice invAction="editInvoice" v-bind:editInvoice="editInvoiceObj"> </generate-invoice>
        </div>
        <b-modal ref="deleteInvoiceModal" hide-footer title="Sterge factura">
            <div class="d-block text-center">
                <h3>Esti sigur ca vrei sa stergi ?</h3>
            </div>
            <div class="d-block text-center mt-5">
                Numar factura:  <strong>{{ deletedInvoiceId }}</strong>
            </div>
            <div class="d-block text-center mb-5">
                Client:  <strong>{{ deletedInvoiceClient }}</strong>
            </div>
            <div class="d-flex">
                <b-btn class="mt-3 w-auto mr-3" variant="outline-success" block @click="deleteInvoice">Sterge</b-btn>
                <b-btn class="mt-3 w-auto" variant="outline-danger" block @click="deleteInvoiceModalHide">Nu sterge</b-btn>
            </div>
        </b-modal>
    </div>
</div>
</template>

<script>
import { pdf } from '../pdf/invoice.js'
import { chitanta } from '../pdf/invoice.js'
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
            dataNewInvoice: Object,
            editInvoiceObj: Object,
            deleteInvoiceObj: Object,
            deletedInvoiceId: '',
            deletedInvoiceClient: ''

        }
    },
    mounted() {
        this.assignInvoices()
    },
    updated() {
        if(this.invoices != this.getInvoices){
            this.assignInvoices()
        }
    },
    methods: {
        ...mapActions({
            deleteInv: 'deleteInvoice'
        }),
        assignInvoices() {
           return this.invoices = this.getInvoices;
        },
        createPDF(data) {
            pdf(data)
        },
        createChitanta(data) {
            chitanta(data)
        },
        clearSearch() {
            this.searchInvoice = '';
            this.dateSelected = true;
        },
        facturaNoua(inv) {
            this.$store.state.newInvoiceFromDetails = true;
            this.dataNewInvoice = inv;
        },
        editeazaFactura(inv) {
            this.$store.state.editInvoice = true;
            this.editInvoiceObj = inv;
        },
        deleteInvoiceModalShow (inv) {
            this.deleteInvoiceObj = inv;
            this.deletedInvoiceId = inv.factura.factura;
            this.deletedInvoiceClient = inv.factura.firma;
            this.$refs.deleteInvoiceModal.show()
        },
        deleteInvoice(){
            this.deleteInv(this.deleteInvoiceObj).then(
                this.$refs.deleteInvoiceModal.hide()
            );
        },
        deleteInvoiceModalHide () {
         this.$refs.deleteInvoiceModal.hide()
        }
    },
    computed: {
        ...mapGetters({
            getInvoices: 'getInvoices',
            newInvoiceFromDetails: 'newInvoiceFromDetails',
            editInvoice: 'editInvoice',
            
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
    },
    watch: {
        
    }
}
</script>

<style lang="scss" scoped>
    .text-grey {
        color: darkgrey;
    }
</style>
