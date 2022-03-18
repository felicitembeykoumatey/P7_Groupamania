<template>
<p>
<button v-on:click="logout"  class="btn-logout" type="submit"><Deconnexion/>
<font-awesome-icon icon="fas fa-power-off" /></p>
</template>

<script>
export default {
    name:'Deconnexion',
    methods: {
        logout(){
            localStorage.clear();
            document.location.href="http://localhost:8080/login";
        }
    }
}
</script>

<!--CSS-->
<style scoped>

.btn-logout{
 padding: 5px;
  font-size: 15px;
  background: linear-gradient(#9356DC, #FF79DA);
  text-decoration: none;
  color: white;
  border: 0px solid;
  border-radius: 20px;
  cursor:pointer;

}

.btn-logout:hover{
background: linear-gradient(#0000,#dc143c);
  text-shadow: 2px 2px 2px #000000;
  box-shadow: 2px 2px 2px #000000;
  transition-duration: .15s;
 opacity: 0.8;
}
</style>