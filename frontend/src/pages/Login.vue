<template>
<main class="row"> 
<div class="col-md-6 offset-md-3">
<h1>SE CONNECTER</h1>
<hr/>
</div>
          <form>  <!-- Formulaire -->
    <div class="form-group">
          <!-- Nom d'utlisateur-->
            <input type="text" placeholder="Nom d'utilisateur" name="username" required>
</div>         
<div class="form-group">
  <!-- Email -->
		
			<input type="email" name="email" id="email" placeholder="Email" autofocus required v-model="email">
               </div>
               <div class="form-group">
                <!-- Mot de passe -->
               
               <input type="password" placeholder="Enter mot de passe" name="passeword" required>
                  </div>
                  <div class="my-3">
                        <!-- Bouton connexion -->
                <button type="submit">Se connecter</button>
                </div>
                 <label><input type="checkbox" checked="checked" name="remember"> Souviens-toi de moi.</label>
         
  <h3 class="psw-forgot"><a href="#" > Mot de passe oublié?</a></h3>
           
                            <!-- Inscription-->
                            <h3 class="signup-link"> Pas de compte? <a href="./views/signup.html"> S'inscrire</a>
                            </h3>
              


         </form>
        
</main>
</template>
<script>
export default {

};
</script>

<style scoped lang="CSS">

</style>