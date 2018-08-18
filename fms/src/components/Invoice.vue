<template>
  <div class="posts">
    This file will list all the posts.

    <div v-for="invoice in invoices">
      <p>
        <span><b>{{ invoice.title }}</b></span><br />
        <span>{{ invoice.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import InvoiceService from '@/services/InvoiceService'
export default {
  name: 'Invoice',
  data () {
    return {
      invoices: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await InvoiceService.fetchInvoices()
      this.invoices = response.data
    }
  }
}
</script>