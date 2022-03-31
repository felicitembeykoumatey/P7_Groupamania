<template>
  <img
    class="img-logo"
    src="./assets/icon-left-font-monochrome-black.svg"
    alt=" logo groupomania"
  />

  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.img-logo {
  width: 40%;
}
</style>
