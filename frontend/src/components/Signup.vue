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
          <h3 class="text-center py-3 text-primary">Inscription</h3>
          <div v-if="alert" :class="color" role="alert">
            {{ alert }}
          </div>

          <form @submit.prevent="dataSignup">
            <div class="mb-3">
              <label for="lastname" class="form-label"> Nom </label>
              <input
                type="lastname"
                name="lastname"
                id="lastname"
                placeholder="Nom"
                v-model="dataUser.lastname"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label for="firstname" class="form-label">Prénom</label>
              <input
                type="firstname"
                name="firstname"
                id="firstname"
                placeholder="Prénom"
                v-model="dataUser.firstname"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="Username" class="form-label">Nom d'utilisateur</label>
              <input
                type="Username"
                name="Username"
                id="Username"
                placeholder="Nom d'utilisateur"
                v-model="dataUser.username"
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label for="grade" class="form-label">Fonction</label>
              <input
                type="text"
                name="grade"
                id="grade"
                placeholder="Fonction"
                v-model="dataUser.grade"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                v-model="dataUser.email"
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
                v-model="dataUser.password"
                class="form-control"
              />
            </div>

            <div class="form-check">
              <input
                type="radio"
                id="sex"
                name="genre"
                value="homme"
                v-model="dataUser.sex"
                required
                @click="user_is_a_man"
                class="form-check-input"
              />
              <label class="form-check-label" for="sex"> Homme </label>
            </div>

            <div class="form-check">
              <input
                type="radio"
                id="sex"
                name="genre"
                value="femme"
                v-model="dataUser.sex"
                required
                @click="user_is_a_woman"
                class="form-check-input"
                checked
              />
              <label class="form-check-label" for="sex"> Femme </label>
            </div>

            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">S'inscrire</button>
            </div>
          </form>

          <p class="py-3">
            <small>
              Vous avez déjà un compte?
              <router-link class="redirection-Home" to="/login"
                >Se connecter</router-link
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
//import store from '../store/index.js';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Signup",
  data() {
    return {
      dataUser: {
        firstname: "",
        lastname: "",
        username: "",
        grade: "",
        sex: "",
        email: "",
        password: "",
      },
      alert: null,
      color: null,
    };
  },
  methods: {
    dataSignup() {
      const formData = new FormData();
      formData.append("firstname", this.dataUser.firstname);
      formData.append("lastname", this.dataUser.lastname);
      formData.append("username", this.dataUser.username);
      formData.append("grade", this.dataUser.grade);
      formData.append("sex", this.dataUser.sex);
      formData.append("email", this.dataUser.email);
      formData.append("password", this.dataUser.password);

      if (
        !this.firstname ||
        !this.lastname ||
        !this.username ||
        !this.grade ||
        !this.sex ||
        !this.email ||
        !this.password
      ) {
        //console.log("formData12 :", formData);
        axios
          .post("http://localhost:3000/signup", this.dataUser)

          .then((res) => {
            this.alert = res.data.message;
            this.color = "alert alert-success mtb-2";
            router.push({ path: "login" });
          })
          .catch((error) => {
            this.alert = error.response.data.message;
            this.color = "alert alert-danger mtb-2";
            //  .catch((error) => {
            //commit("SET_ERROR", error);
            // this.msg = "Remplissez tous les champs du formulaire !";
            // alert(
            //  `L'un des champs n'est pas correctement renseigné : Le mot de passe doit comprendre une majuscule et 1 chiffre et doit être de 8 caractères minimum. Email doit être valide.  ) ! ${error}`
            //);
          });
      }
    },
  },
};
</script>
