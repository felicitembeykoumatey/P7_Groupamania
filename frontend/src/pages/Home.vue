<template>
  <main>
    <section class="welcome">
      <h1>Bienvenu(e) à votre réseau social d'entreprise</h1>
      <p>
        Vous pouvez désormais discuter et apprendre à connaitre vos collègues
      </p>
      <span class="link-signup"
        ><router-link class="redirection-signup" to="/signup">
          <button
            v-on:click="userSignup"
            type="submit"
            class="btn-signup"
            value="s'inscrire"
          >
            S'inscrire
          </button>
        </router-link></span
      >

      <span class="link-login"
        ><router-link class="redirection-login" to="/login">
          <button
            v-on:click="userLogin"
            type="submit"
            class="btn-login"
            value="Connecté"
          >
            Se connecter
          </button>
        </router-link>
      </span>
    </section>
  </main>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
};
</script>

<!--Css-->
<style scoped>
.link-signup,
.link-login {
  margin: 6px;
}
</style>
