<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  name: 'App',
  components: {
    "Nav": Nav
  }
}
</script>

<style>
  #app {

  }

  body {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
