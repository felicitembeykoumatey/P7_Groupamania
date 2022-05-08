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
        <div class="col-md-6 offset-md-3 col-sm-12 shadow-lg bg-light">
          <div class="text-center py-3">
            <h3 class="text-primary">Inscription</h3>
          </div>

          <div v-if="msg" class="alert alert-danger mtb-2" role="alert">
            {{ msg }}
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
                type="grade"
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
                type="email"
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
        </div>
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
      errMsg: null,
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
      /* console.log("firstname", this.dataUser.firstname);
      console.log("lastname", this.dataUser.lastname);
      console.log("username", this.dataUser.username);
      console.log("grade", this.dataUser.grade);
      console.log("email", this.dataUser.email);
      console.log("password", this.dataUser.password);
      console.log("sex", this.dataUser.sex);*/
      console.log("formData", formData);

      if (
        !this.firstname ||
        !this.lastname ||
        !this.username ||
        !this.grade ||
        !this.sex ||
        !this.email ||
        !this.password
      ) {
        this.errMsg = "Svp, remplissez tous les champs du formulaire !";
      }
      console.log("formData12 :", formData);
      axios
        .post("http://localhost:3000/signup", this.dataUser)

        .then(() => {
          // localStorage.setItem("token", response.data.token);
          // console.log(response); //une fois le compte enregistré on remet les inputs "à 0"
          //Réinitialisation
          // this.dataUser.email = null;
          //this.dataUser.username = null;
          router.push({ path: "login" });
          //document.location.href = "http://localhost:8080/login";
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
