<template>
<div class="id-111">
  <div class="container">
    <div class="row">
      <b-tabs class="w-100 mt-5">
        <b-tab title="Factura noua" active>
          
        </b-tab>
        <b-tab title="Lista facturi">
          <invoice-list/>
        </b-tab>
        <b-tab title="disabled">
          <br>Disabled tab!
        </b-tab>
      </b-tabs>
    </div>
  </div>
</div>


</template>

<script>
import InvoiceList from '@/components/InvoiceList'

export default {
  name: 'Invoice',
  components: {
    "InvoiceList": InvoiceList
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
  computed: {

  }
}
</script>