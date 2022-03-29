<template>
<main> 
            <div>
                  <h1>SE CONNECTER</h1>
<hr/>
            </div>
                   <form>  <!-- Formulaire -->
   
                  <div>
  <!-- Email -->
		
			<input type="email" name="email" id="email" placeholder="Email" autofocus required v-model="dataForm.email">
               </div>

               <!-- Mot de passe -->
               <div>
              
               <input type="password" placeholder="Mot-de-passe" name="passeword" v-model="dataForm.password"/>
                  </div>
                  <div class="btn">
                        <!-- Bouton connexion -->
               <router-link class="redirection-" to="/posts"> 
               <button v-on:click="userLogin" type="submit" class="btn-connexion" value="Connecté">Se connecter</button>
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
            dataForm:{
                  email:"",
                  password: ""
            },
      };
},
  
 methods: {
       
userLogin(){
    //console.log("this.dataForm.email ", this.dataForm.email)
   // console.log("this.dataForm.password  ", this.dataForm.password)
    if (
        this.dataForm.email ==null ||
        this.dataForm.password ==null 
      )
       
{
      this.msg="Erreur de saisie"
}
//console.log('this.dataForm',this.dataForm)

axios.post("http://localhost:3000/login", this.dataForm)
 .then(response => {
     
    
                      alert('Utilisateur connecté !')
   localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('token', response.data.token)
      document.location.href="http://localhost:8080/posts";
    
}

) 
.catch(error => response.status(400).json({ error: error.message }));
      
}

 }

};
</script>

<style scoped lang="CSS">

</style>