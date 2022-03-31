<template>

<main class="signup-box">
    <h1>S'inscrire</h1>

 <form>

        
          <input type="text" class="form-control" id="firstname"  placeholder="Prénom" v-model="dataForm.firstname" />
          <input type="text" class="form-control" id="lastname"  placeholder="Nom" v-model="dataForm.lastname" /> 
          <input type="text" class="form-control" id="username"  placeholder="Nom d'utilisateur" v-model="dataForm.username" />       
          <input type="text" class="form-control" id="grade"  placeholder="Fonction" v-model="dataForm.grade" />
          <input type="text" placeholder="Email" id="email" v-model="dataForm.email"/>
          <input type="password" placeholder="Mot de passe" id="password"  v-model="dataForm.password"/>
        
          <br>
   
                    <input type="radio" id="male" name="genre" value="homme" v-model="dataForm.male" required @click="user_is_a_man"/>
                    <label for="genre">Homme</label>
                    <input type="radio" id="female" name="genre" value="femme"  v-model="dataForm.radio" required @click="user_is_a_woman"/>
                    <label for="genre">Femme</label>
            <!-- Button -->
             <router-link class="redirection-Home" to="/"><button  @click="dataSignup"  class="btn-signup" type="submit" >S'inscrire</button>
  </router-link>
      </form>         
         <h2>{{ errMsg }}</h2>
         <p class="link-signup">
         
            Vous avez déjà un compte,
            <router-link class="redirection-login" to="/login">connecter-vous</router-link>
         
        </p>
 
</main>

</template>

<script>
import axios from "axios";
import router from '../router';
import store from '../store/index.js';
export default{
  name:'signup',
  data(){
    return {
      dataForm:{
        firstname:"",
        lastname:"",
        username:"",
        grade:"",
        email:"",
        passeword:"",
        male:"",
        female:""
        
      },
   errMsg: null
    };
  },
  methods:{
    dataSignup(){
     // données de connexion 
         const login = {
                email: this.dataForm.email,
                password: this.dataForm.password
            }


        
       if (this.firstname !== null||  this.lastname !== null || this.username !== null || this.grade !== null  || this.email !== null ||  this.password !== null  ||  this.male !== null ||  this.female !== null) {
                axios
                    .post("http://localhost:3000/signup",
                        this.dataForm
                    )
                    .then(response => {
                      alert('Bravo votre compte est crée avec succès! Rédirection vers la page connexion!')
                     
                       document. location. href="http://localhost:8080";
                    })
                  
 .catch(error => console.log(error))
            } else {
                alert("L'un des champs n'est pas renseigné !");
            }
        },
    },
};
 
 </script>