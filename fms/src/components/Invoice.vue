<template>
<div>
    <div class="container">
        <div class="row">
            <b-tabs class="w-100 mt-5 p-2 p-sm-0">
                <b-tab title="Factura noua" :title-link-class="linkClass(0)" v-if="invoices.length != 0" active>
                    <invoice-statistics />
                    <generate-invoice />
                </b-tab>
                <b-tab title="Lista facturi" :title-link-class="linkClass(1)" v-if="invoices.length != 0">
                    <invoice-statistics />
                    <invoice-list v-bind:invoices="invoices"/>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</div>
</template>

<script>
import InvoiceService from '@/services/InvoiceService'
import GenerateInvoice from '@/components/GenerateInvoice'
import InvoiceList from '@/components/InvoiceList'
import InvoiceStatistics from '@/components/InvoiceStatistics'
import { mapActions } from 'vuex';

export default {
    name: 'Invoice',
    components: {
        "InvoiceList": InvoiceList,
        "GenerateInvoice": GenerateInvoice,
        "InvoiceStatistics": InvoiceStatistics
    },
    data() {
        return {
            tabIndex: 0,
            invoices: []
        }
    },
    mounted() {
        this.getApiInvoices();
    },
    methods: {
        ...mapActions({
            aInvoices: 'aInvoices'
        }),
        linkClass(idx) {
            if (this.tabIndex === idx) {
                return ['bg-light', 'color-dark']
            } else {
                return ['bg-light', 'color-dark']
            }
        },
        async getApiInvoices() {
            const r = await InvoiceService.fetchInvoices();
            this.invoices = r.data;
            if (r.status == 200) {
                this.aInvoices(r.data)
            }

        }
    },
    computed: {

    }
}
</script>

<style lang="scss">
.color-dark {
    color: #343a40 !important;
}
</style>
