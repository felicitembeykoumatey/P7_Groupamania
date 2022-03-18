<template>

<main class="signup-box">
    <h1>Créer un compte</h1>

 <form>

        <!--Username-->
         <div class="form-group">
          <label for="inputUsername"><span>Username </span></label>
          <input type="text" class="form-control" id="inputUsername"  placeholder="Nom d'utilisateur" v-model="username" />
        </div>
         <!-- Email-->
           <div class="form-group">
        <label>Email</label>
        <input type="text" placeholder="Email" v-model="email"/>
          </div>
         <!-- Mot de passe -->
           <div class="form-group">
        <label>Mot-de-passe</label>
        <input type="password" placeholder="Mot de passe" v-model="password" required/>
        </div>
    <br>
       <!-- Sexe -->
            <label for="genre">Genre</label><br/>
            <ul class="genre">
                <li>
                    <input type="radio" id="genre_male" name="genre" value="homme" required @click="user_is_a_man"/>
                    <label for="genre">Homme</label>
                </li>
                <li>
                    <input type="radio" id="genre_female" name="genre" value="femme" required @click="user_is_a_woman"/>
                    <label for="genre">Femme</label>
                </li>
            </ul>

            <!-- Button -->
                <button  @click.prevent="dataSignup"  class="btn-signup" type="submit" >S'inscrire</button>

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
export default{
  name: "Signup", 
  data(){
    return{
      // ajouter les elements supplementaires lastname/firstname/fonction.
      username:"",
      sex:"",
      email:"",
      passeword:""
    };
    console.log(data);
  },
   methods: {

     //axios
   }
};
 </script>