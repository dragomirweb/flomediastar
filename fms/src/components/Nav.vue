<template>
<b-navbar class="header-nav" toggleable="md" type="default" variant="dark">

  <b-navbar-toggle target="nav_collapse">
    <div class="d-flex flex-column">
      <div style="width: 30px; height:3px;background-color:white;margin-bottom:5px;"></div>
      <div style="width: 30px; height:3px;background-color:white;margin-bottom:5px;"></div>
      <div style="width: 30px; height:3px;background-color:white;margin-bottom:5px;"></div>
      <div style="width: 30px; height:3px;background-color:white;margin-bottom:5px;"></div>
    </div>

  </b-navbar-toggle>

  <b-navbar-brand class="logo text-uppercase" href="/">Flomediastar</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav class="ml-auto">
      <li class="nav-link text-center" v-for="route in routes"> 
        <router-link :to="route.path">{{ route.name }}</router-link>
      </li>
    </b-navbar-nav>

    
    <!-- <b-navbar-nav>
      <b-nav-item-dropdown left>
        <template slot="button-content">
          <em>Sign in</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav> -->

  </b-collapse>
</b-navbar>
</template>

<script>
import router from '../router'

export default {
  name: "Nav",
  data() {
    return {
      routes: router.options.routes
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .bg-dark {
    background: linear-gradient(to bottom, rgb(40, 50, 68) 0%, rgba(21, 26, 35, 0.95) 100%);
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
  }

  .logo {
    color: white;
  }

  .navbar-default {
  }

  .nav-link a {
    font-size: 1.2rem;
    text-decoration: none;
    color: rgba(255, 255, 255, 1);
    
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

</style>
