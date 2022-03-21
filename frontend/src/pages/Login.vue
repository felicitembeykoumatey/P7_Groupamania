<template>
<main> 
<div>
<h1>SE CONNECTER</h1>
<hr/>
</div>
          <form>  <!-- Formulaire -->
    <div>
          <!-- Nom d'utlisateur-->
            <input type="text" placeholder="Nom d'utilisateur" name="username" required v-model="username">
</div>         
<div>
  <!-- Email -->
		
			<input type="email" name="email" id="email" placeholder="Email" autofocus required v-model="email">
               </div>

               <!-- Mot de passe -->
               <div>
              
               <input type="password" placeholder="Mot-de-passe" name="passeword" v-model="dataLogin.password"/>
                  </div>
                  <div class="btn">
                        <!-- Bouton connexion -->
               <router-link class="redirection-" to="/userProfile"> <button v-on:click="userLogin" type="submit" class="btn-connexion" value="Connecté">Se connecter</button>
                </router-link>
                </div>
                 <label><input type="checkbox" checked="checked" name="remember"> Souviens-toi de moi.</label>
         
           
                            <!-- Inscription-->
            <p>
          <small>
           Pas de compte?
            <router-link class="redirection-singup" to="/signup">S'inscrire</router-link>
          </small>
        </p>
              


         </form>
        
</main>
</template>
<script>

import axios from "axios";
import Footer from '@/components/Footer.vue';

export default {
name:"Login",
components: Footer,
data(){
      return{
            dataLogin:{
                  username:"",
                  email:"",
                  passeword: ""
            },
      };
},
  
 methods: {
userLogin(){

    if (
        this.dataLogin.email ==null ||
        this.dataLogin.password ==null 
      )
{
      this.msg="Erreur de saisie"
}

axios.post("http://localhost:3000/login", this.dataLogin)
.then(res =>{
      localStorage.setItem('token', res.data.token)
      document.location.href="http://localhost:8080/posts";
})
.catch(error=> res.status(400).json({ error: error.message }));
      
}

 }

};
</script>

<style scoped lang="CSS">

</style>