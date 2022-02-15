<template> 
  <div id="app">
    <img id="logo" alt="Groupomania logo" src="./assets/logo.png">
    <HelloWorld msg="Bienvenu(e) sur le réseau social"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
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
#logo{
  width:190px;
}
</style>
