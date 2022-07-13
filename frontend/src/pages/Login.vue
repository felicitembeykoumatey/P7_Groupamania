<template>
  <div class="mx-auto">
    <div class="text-center">
      <img
        src="../assets/icon-left-font-monochrome-black.svg"
        alt=" logo groupomania"
        class="d-inline-block align-text-top my-5"
      />
    </div>
    <div>
      <div class="row py-4 px-3 rounded">
        <section class="col-md-6 offset-md-3 col-sm-12 shadow-lg bg-light">
          <h3 class="text-center py-3 text-primary">Connexion</h3>

          <div v-if="msg" class="alert alert-danger mtb-2" role="alert">
            {{ msg }}
          </div>

          <form @submit.prevent="userLogin">
            <div class="mb-3">
              <label for="email" class="form-label">Email </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                v-model="dataForm.email"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                name="password"
                v-model="dataForm.password"
                class="form-control"
              />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                checked="checked"
                name="remember"
                id="Check"
                class="form-check-input"
              />
              <label class="form-check-label" for="Check"
                >Souviens toi de moi</label
              >
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">
                Se connecter
              </button>
            </div>
          </form>

          <p class="py-3">
            <small>
              Pas de compte?
              <router-link class="redirection-Home" to="/signup"
                >S'inscrire</router-link
              >
            </small>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import router from "../router";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",

  data() {
    return {
      dataForm: {
        email: "",
        password: "",
      },
      msg: "",
    };
  },

  methods: {
    userLogin() {
      const formData = new FormData();
      formData.append("email", this.dataForm.email);
      formData.append("password", this.dataForm.password);
      //console.log("this.dataForm.email :", this.dataForm.email);
      //console.log("this.dataForm.password : ", this.dataForm.password);
      if (!this.dataForm.email || !this.dataForm.password) {
        this.msg = "Erreur de saisie";
      } else {
        axios
          .post("http://localhost:3000/login", formData)
          .then((response) => {
            // console.log("response : ", response);
            localStorage.setItem("token", response.data.token);
            router.push({ path: "posts" });
          })
          .catch((error) => {
            //commit("SET_ERROR", error);
            this.msg = "Compte non existant";
            alert(`Les champs invalides. ${error}`);
          });
      }
    },
  },
};
</script>
