<template>

<header>
<nav class="nav-bar">
<img class="logo" src="../assets/logo.png" alt="logo du réseau"/>
   <h1>Groupomania, réseau social d'entreprise</h1>
  <v-toolbar
  color="blue"
  elevation="7"
>
  
  <div id="nav-link">
      <router-link to="/Signup">S'inscrire</router-link>
   <router-link to="/Login">Se connecter</router-link>

   </div></v-toolbar>


</nav>
</header>
</template>


<script>
  export default {
    name: "HeaderPage"
  };
</script>


<style>


img{
    width:12%;
}
.logo {
  display: flex;
  padding: 0;
}

h1{
  font-size: 32px;
}
#nav-link{
  display: flex;
  width: auto;
}


</style>
