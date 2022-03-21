<template>

<main class="signup-box">
    <h1>S'inscrire</h1>

 <form>
 <!--Username-->
        
          <input type="text" class="form-control" id="firstname"  placeholder="Prénom" v-model="dataUser.firstname" />
        
         <!--Username-->
          <input type="text" class="form-control" id="lastname"  placeholder="Nom" v-model="dataUser.lastname" />
        
         <!--Username-->
          <input type="text" class="form-control" id="username"  placeholder="Nom d'utilisateur" v-model="dataUser.username" />
        
        <!--Username-->
         
          <input type="text" class="form-control" id="grade"  placeholder="Fonction" v-model="dataUser.grade" />
        
         <!-- Email-->

        <input type="text" placeholder="Email" id="email" v-model="dataUser.email"/>
        
         <!-- Mot de passe -->
        
        <input type="password" placeholder="Mot de passe" id="password"  v-model="dataUser.password"/>
        
    <br>
       <!-- Sexe -->
          
                    <input type="radio" id="male" name="genre" value="homme" v-model="dataUser.male" required @click="user_is_a_man"/>
                    <label for="genre">Homme</label>
               
                    <input type="radio" id="female" name="genre" value="femme"  v-model="dataUser.radio" required @click="user_is_a_woman"/>
                    <label for="genre">Femme</label>
              

            <!-- Button -->
                <button  @click="dataSignup"  class="btn-signup" type="submit" >S'inscrire</button>

                 <p>
          <small>
            Vous avez déjà un compte,
            <router-link class="redirection-singup" to="/login">connecter-vous</router-link>
          </small>
        </p>
  </form>
</main>

</template>

<script>
import axios from "axios";
export default{
  name:'signup',
  data(){
    return {
      dataUser:{
        firstname:"",
        lastname:"",
        username:"",
        grade:"",
        email:"",
        passeword:"",
        male:"",
        female:""
        
      }
    };
  },
  methods:{
    dataSignup(){
       if (this.firstname !== null||  this.lastname !== null || this.username !== null || this.grade !== null  || this.email !== null ||  this.password !== null  ||  this.male !== null ||  this.female !== null) {
                axios
                    .post("http://localhost:3000/signup",
                        this.dataUser
                    )
                    .then(response => {
                        console.log(response);
                        this.$router.push("/login");
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
            } else {
                alert("L'un des champs n'est pas renseigné !");
            }
        },
    },
};
 
 </script>