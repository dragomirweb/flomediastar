<template>
<div>
  <div class="container">
      <b-tabs class="w-100 mt-5">
        <b-tab title="Factura noua" :title-link-class="linkClass(0)" active>
          <generate-invoice />
        </b-tab>
        <b-tab title="Lista facturi" :title-link-class="linkClass(1)">
          <invoice-list />
        </b-tab>
      </b-tabs>
  </div>
</div>


</template>

<script>
import GenerateInvoice from '@/components/GenerateInvoice'
import InvoiceList from '@/components/InvoiceList'

export default {
  name: 'Invoice',
  components: {
    "InvoiceList": InvoiceList,
    "GenerateInvoice": GenerateInvoice
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  mounted () {
  },
  methods: {
    linkClass (idx) {
      if (this.tabIndex === idx) {
        return ['bg-light', 'color-dark']
      } else {
        return ['bg-light', 'color-dark']
      }
    }
  },
  computed: {

  }
}
</script>
<style lang="scss" >
.color-dark {
  color: #343a40 !important;
}
</style>
