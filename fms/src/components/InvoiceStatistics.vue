<template>
<div>
    <div class="mt-2 w-100 d-flex flex-column flex-md-row justify-content-center" v-if="this.invoices != []">
        <div class="w-100 d-flex flex-column justify-content-center p-3 mr-2 border border-info">
            <h4 class="h6 m-0">
                Facturi:
                <span class="text-info font-weight-bold">{{ invoices.length }}</span>
            </h4>
            <h4 class="h6 m-0">
                Ultima factura:
                <span class="text-info text-uppercase font-weight-bold" >
                        {{ lastInvoice }}
                    </span>
            </h4>
        </div>
        <div class="w-100 border border-info p-3 mr-2">
            <h4 class="py-3 h6 mb-0">Factura emisa la:<br ><span class="text-info font-weight-bold">{{ lastDate | moment("D-M-YYYY") }}</span></h4>
        </div>
        <div class="w-100 border border-info p-3">
            <h4 class="py-3 h6 mb-0">Ultimul client: <br ><span class="text-info font-weight-bold text-uppercase">{{ lastClient }}</span></h4>
        </div>
    </div>
    
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    name: 'InvoiceStatistics',
    data() {
        return {
            invoices: []
        }
    },
    created() {
    },
    mounted() {
        this.assignInvoices()
    },
    methods: {
       assignInvoices() {
            return this.invoices = this.getInvoices;
        },
    },
    computed: {
        ...mapGetters({
            getInvoices: 'getInvoices'
        }),
        lastInvoice() {
            if (this.invoices.length !== 0) {
                let invoices = this.invoices;
                // return this.invoices[this.invoices.length - 1].factura.factura;
                return invoices[0].factura.factura
            }
        },
        lastClient() {
            if (this.invoices.length !== 0) {
                let invoices = this.invoices;
                return invoices[0].factura.firma;
            }
        },
        lastDate() {

            if (this.invoices.length !== 0) {
                let invoices = this.invoices;
                return invoices[0].factura.data;
            }
        }
    },
    watch: {
        'getInvoices': function (){
            this.assignInvoices()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
