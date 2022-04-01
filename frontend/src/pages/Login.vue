<template>
<main> 
            <div>
                  <h1>SE CONNECTER</h1>

<hr/>

<h4 style="color:red"> {{msg}}</h4>
            </div>
                   <form @submit.prevent="userLogin">  <!-- Formulaire -->
   
                  <div>
  <!-- Email -->
		
			<input type="email" name="email" id="email" placeholder="Email"  v-model="dataForm.email">
               </div>

               <!-- Mot de passe -->
               <div>
              
               <input type="password" placeholder="Mot-de-passe" name="password" v-model="dataForm.password"/>
                  </div>
                  <div class="btn">
                        <!-- Bouton connexion -->
               <!-- <router-link class="redirection-" to="/posts">  </router-link>-->
               <button type="submit" class="btn-connexion" value="Connecté">Se connecter</button>
               
                </div>
                 <label><input type="checkbox" checked="checked" name="remember"> Souviens-toi de moi.</label>
           </form>
           
       <!-- Inscription-->
            <p>
          <small>
           Pas de compte?
            <router-link class="redirection-singup" to="/signup">S'inscrire</router-link>
          </small>
        </p>
              


       
        
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
            msg:null
      };
},
  
 methods: {
       
userLogin(){
    //console.log("this.dataForm.email ", this.dataForm.email)
   // console.log("this.dataForm.password  ", this.dataForm.password)
    if ( !this.dataForm.email  || !this.dataForm.password  ){
      this.msg="Erreur de saisie"
console.log('je suis dans le if')
      //console.log('this.dataForm',this.dataForm)
     }else{
           console.log('je suis dans le else')
           

console.log('this.dataForm',this.dataForm)
axios.post("http://localhost:3000/login", this.dataForm)
 .then(response => {
     
    /*
                      alert('Utilisateur connecté !')
   localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('token', response.data.token)
      document.location.href="http://localhost:8080/posts";*/
    //console.log(response)
}

) 
 .catch(error => console.log(error))
      
}


}
 }

};
</script>

<style scoped lang="CSS">

</style>