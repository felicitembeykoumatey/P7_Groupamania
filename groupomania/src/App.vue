<template> 
  <div id="app">
    <img id="logo" alt="Groupomania logo" src="./assets/logo.png">
    <HelloWorld msg="Bienvenu(e) sur votre réseau social d'entreprise !"/>
  </div>
  <nav> 
  <router-link to ="/">S'inscrire</router-link>
  
  <router-link to ="/">Se connecter</router-link>
  </nav>
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
  color: #5346c7;
  margin-top: 60px;
}
#logo{
  width:190px;
}
</style>
