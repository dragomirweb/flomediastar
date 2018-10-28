<template>
 <b-container >
  <b-row>
    <b-col cols="12">
      <div class="time my-4">
        Data: {{ new Date() | moment("Do MMMM YYYY, h:mm:ss a") }}
      </div>
    </b-col>
    <div class="col-12">
      <h3>Curs BNR</h3>
    </div>
    <div class="col-6 d-flex">
      <div class="mr-4">
        <h6>EUR</h6>
        <h6>USD</h6>
        <h6>XAU</h6>
        <h6>GBP</h6>
      </div>
      <div v-if="curs != []">
        <h6  v-for="currency in curs" class="text-danger">{{ currency }}</h6>
      </div>
    </div>
    <div class="col-6"> 

    </div>
  </b-row>
</b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'Homepage',
  data () {
    return {
      valuta: {
        eur: '',
        usd: '',
        xau: '',
        gbp: ''
      },
      curs: []
    }
  },
  computed: {
  },
  mounted() {
    this.getCurrency()
  },
  methods: {
    getCurrency() {
      const vm = this;
      const url = 'http://www.infovalutar.ro/';
      const date = moment(new Date()).format('YYYY/M/D');

        for (let [key, value] of Object.entries(vm.valuta)) {
          axios.get(
            url + date + '/' + key + '.bnr'
          ).then(
            r => vm.curs.push(r.data)
          )
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.time {
  font-size: 1.3rem;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
