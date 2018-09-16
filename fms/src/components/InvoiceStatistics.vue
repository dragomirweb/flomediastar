<template>
    <div>
        <div class="mt-2 w-100 d-flex justify-content-center">
            <div class="w-50 d-flex flex-column justify-content-center align-items-center mr-2 border border-info">
                <h4 class="h6 m-0">
                    Facturi: 
                    <span class="text-info font-weight-bold">{{ invoices.length }}</span>
                </h4>
                <h4 class="h6 m-0">
                    Ultima factura: 
                    <span class="text-info font-weight-bold" >
                        {{ lastInvoice }}
                    </span>
                </h4>
            </div>
            <div class="w-25 border border-info mr-2">
                <h4 class="py-3 h6 text-center mb-0">Data  <span class="text-info font-weight-bold">{{ new Date() | moment("Do MMMM YYYY") }}</span></h4>
            </div>
            <div class="w-25 border border-info mr-2">
                <h4 class="py-3 h6 text-center mb-0">Ultimul client facturat <span class="text-info font-weight-bold">{{ lastClient }}</span></h4>
            </div>
        </div>
    </div>
</template>
<script>
import InvoiceService from '@/services/InvoiceService'

export default {
    name: 'InvoiceStatistics',
    data () {
        return {
            invoices: []
        }
    },
    mounted () {
        this.getInvoices()
    },
    methods: {
        async getInvoices () {
            const response = await InvoiceService.fetchInvoices()
            this.invoices = response.data
        },
    },
    computed: {
        lastInvoice() {
            if(this.invoices.length !== 0){
            return this.invoices[this.invoices.length - 1].title;
            }
        },
        lastClient() {
            if(this.invoices.length !== 0){
            return this.invoices[this.invoices.length - 1].client;
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

