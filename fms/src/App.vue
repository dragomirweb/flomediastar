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
  $box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
  #app {
    
  }

  body {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    background-color: #eaeaea;

  }

  .bg-dark {
    background: linear-gradient(to bottom, rgb(40, 50, 68) 0%, rgba(21, 26, 35, 0.95) 100%);
    box-shadow: $box-shadow;
  }
</style>
