<template>

<main class="signup-box">
    <h1>Créer un compte</h1>

 <form>
     <!-- Prenom -->
             <label>Prénom</label>
        <input type="text" placeholder="Prénom" />
      <!-- Nom -->
        <label>Nom</label>
        <input type="text" placeholder="Nom" />

        <!--Username-->
         <div class="form-group">
          <label for="inputUsername"><span>Username </span></label>
          <input type="text" class="form-control" id="inputUsername"  placeholder="Nom d'utilisateur" v-model="dataSignup.username" />
        </div>
         <!-- Email-->
           <div class="form-group">
        <label>Email</label>
        <input type="text" placeholder="Email" v-model="dataSignup.email"/>
          </div>
         <!-- Mot de passe -->
           <div class="form-group">
        <label>Mot-de-passe</label>
        <input type="password" placeholder="Mot de passe" />
        </div>
    <br>
       <!-- Sexe -->
            <label for="genre">Genre</label><br/>
            <ul class="genre">
                <li>
                    <input type="radio" id="genre" name="genre" value="homme" required @click="user_is_a_man"/>
                    <label for="genre">Homme</label>
                </li>
                <li>
                    <input type="radio" id="genre" name="genre" value="femme" required @click="user_is_a_woman"/>
                    <label for="genre">Femme</label>
                </li>
            </ul>

            <!-- Button -->
                <button  @click.prevent="userSignup"  class="btn-signup" type="submit" >S'inscrire</button>

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
import Footer from '@/components/Footer.vue';

export default {

name: "Signup",
components:Footer,
data(){
    return{
        dataSignup:{
username: null,
email:null,
password:null,
sex: null

        }
    }
},
methods:{
    userSignup(){
    const formData = new FormData();
   formData.append('username', this.dataSignup.username);
  formData.append('email', this.dataSignup.email);
  formData.append('password', this.dataSignup.password);

  if (formData.get("email") !== null & formData.get("username") !== null & formData.get("password") !== null)
   { this.msg ="erreur de saisie"}
  
{
        axios
          .post("http://localhost:3000/signup", formData)
          .then(response => {
           
            //Réinitialisation
            this.dataSignup.email = null;
            this.dataSignup.username = null;
            this.dataSignup.password = null;
            document. location. href="http://localhost:8080/signup";
          })
         .catch(error=> res.status(400).json({ error: error.message }));
      } 
    }

    
}

};
</script>
