<template>
 <b-container >
  <b-row>
    <b-col cols="12">
      <div class="time my-4">
        Data: {{ new Date() | moment("Do MMMM YYYY, h:mm:ss a") }}
      </div>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Homepage',
  data () {
    return {
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    
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
