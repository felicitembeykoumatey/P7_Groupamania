<template>
  <main>
    <div>
      <h1>SE CONNECTER</h1>

      <hr />

      <h4 style="color: red">{{ msg }}</h4>
    </div>
    <form>
      <!-- Formulaire -->

      <div>
        <!-- Email -->

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          v-model="dataForm.email"
        />
      </div>

      <!-- Mot de passe -->
      <div>
        <input
          type="password"
          placeholder="Mot-de-passe"
          name="password"
          v-model="dataForm.password"
        />
      </div>
      <div class="btn">
        <!--  <router-link class="redirection-" to="/posts">
          <button
            @submit.prevent="userLogin"
            type="submit"
            class="btn-connexion"
          >
            Connexion
          </button></router-link
        >-->

        <button
          v-on:click="userLogin"
          type="submit"
          class="btn-connexion"
          value="Connecté"
        >
          Se connecter
        </button>
        <!-- Bouton connexion -->
        <!-- 
        <button type="submit" class="btn-connexion" value="Connecté">
          Se connecter
        </button>-->
      </div>
      <label
        ><input type="checkbox" checked="checked" name="remember" />
        Souviens-toi de moi.</label
      >
    </form>

    <!-- Inscription-->
    <p>
      <small>
        Pas de compte?
        <router-link class="redirection-singup" to="/signup"
          >S'inscrire</router-link
        >
      </small>
    </p>
  </main>
</template>
<script>
import axios from "axios";
import Footer from "@/components/Footer.vue";
//import router from "../router";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: Footer,
  data() {
    return {
      dataForm: {
        email: "",
        password: "",
      },
      msg: null,
    };
  },

  methods: {
    userLogin() {
      console.log("this.dataForm.email ", this.dataForm.email);
      console.log("this.dataForm.password  ", this.dataForm.password);
      if (!this.dataForm.email || !this.dataForm.password) {
        this.msg = "Erreur de saisie";

        console.log("je suis dans le if");
        //console.log('this.dataForm',this.dataForm)
      } else {
        console.log("je suis dans le else");

        console.log("this.dataForm", this.dataForm);
        axios
          .post("http://localhost:3000/login", this.dataForm)
          .then((response) => {
            console.log("response : ", response);
            localStorage.setItem("token", response.data.token);

            document.location.href = "http://localhost:8080/posts";
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped lang="CSS"></style>
