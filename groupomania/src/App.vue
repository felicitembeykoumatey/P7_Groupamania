<template> 
  <div id="app">
    <img id="logo" alt="Groupomania logo" src="./assets/logo.png">
   
  </div>
  <nav> 
  <router-link to ="/">S'inscrire</router-link>
  
  <router-link to ="/">Se connecter</router-link>
  </nav>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4a1c93;
  margin-top: 60px;
}
#logo{
  width:190px;
}
a{
  text-decoration: none; 
  color:   #0510bf;
   font-weight: bold;
 font-size: medium;
}
</style>
