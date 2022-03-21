<template>
<main>

<section class="welcome">
<h1>Bienvenu(e) au reseau social d'entreprise</h1>
<p class="msg-accueil">
Connectez-vous et restez en contact avec vos collègues.
Ensemble amusons nous!
</p>
  <router-link class="redirection-login" to="/login"><button v-on:click="userLogin" type="submit" class="btn-connexion" value="Connecté">Se connecter</button></router-link>
  <br>
   <router-link class="redirection-signup" to="/signup"><button v-on:click="userLogin" type="submit" class="btn-inscription" value="Connecté">S'inscrire</button></router-link>
</section>
</main>

</template>