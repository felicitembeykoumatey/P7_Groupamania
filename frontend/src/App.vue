<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <div v-if="!connected">
      <header />
      <router-view />
      <footer />
    </div>

    <Navigation v-else>
      <template v-slot:page>
        <router-view :key="$route.fullPath" />
      </template>
    </Navigation>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: arial;
  background-color: #02070d;
  font-size: 15px;
}
</style>

<script>
import header from "./components/header";
import nav from "./components/nav";
import footer from "./components/footer";

export default {
  name: "Login",
  data() {
    return {
      connected: false,
    };
  },
  components: {
    header,
    footer,
    nav,
  },
  beforeMount() {
    const userStorage = JSON.parse(sessionStorage.getItem("userToken"));
    if (userStorage != null) {
      this.connected = true;
    } else {
      this.connected = false;
    }
  },
};
</script>
