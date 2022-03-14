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
         <!-- Email-->
        <label>Email</label>
        <input type="text" placeholder="Email" />
  
         <!-- Mot de passe -->
        <label>Mot-de-passe</label>
        <input type="password" placeholder="Mot de passe" />
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
                <button class="signup" type="submit" >S'inscrire</button>
  </form>
</main>

</template>
<script>
export default {

};
</script>
