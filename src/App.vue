<template>
  <div id="app">
     <sui-menu pointing top fixed>
      <sui-menu-item>
        <p>VueJS App</p>
      </sui-menu-item>
      <sui-menu-item>
        <router-link to="/">Home</router-link>
      </sui-menu-item>
      <sui-menu-item>
        <router-link to="/create">Create</router-link>
      </sui-menu-item>
    </sui-menu>
    <!-- <b-navbar toggleable="lg" type="dark" variant="danger">
      <b-navbar-brand href="#">
        <img alt="Vue logo" src="./assets/logo.png" style="width: 60px; padding-left: 1em" />
      </b-navbar-brand>

      <b-navbar-toggle target="navbar"></b-navbar-toggle>

      <b-collapse id="navbar" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <b-nav-item :to="{name: 'home'}">Home</b-nav-item>
          </b-nav-item>
          <b-nav-item>
            <b-nav-item :to="{name: 'create'}">Create</b-nav-item>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> -->
    <img alt="Vue logo" src="./assets/logo.png" />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0.5em;
}
</style>
