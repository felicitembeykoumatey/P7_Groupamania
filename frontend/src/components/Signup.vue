<template>
  <div class="container-fluid vh-100" style="margin-top: 300px">
    <div class="" style="margin-top: 200px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 class="text-primary">Création compte</h3>
          </div>

          <div class="p-5">
            <form @submit.prevent="dataSignup">
              <div class="mb-3">
                <label for="password" class="form-label"
                  >Nom d'utilisateur</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nom d'utilisateur"
                  v-model="dataForm.username"
                />
              </div>

              <div class="mb-3">
                <label for="firstname" class="form-label">Prénom</label>
                <input
                  type="text"
                  id="firstname"
                  class="form-control"
                  placeholder="Prénom"
                  v-model="dataForm.firstname"
                />
              </div>
              <div class="mb-3">
                <label for="lastname" class="form-label">Nom</label>
                <input
                  type="text"
                  id="lastname"
                  class="form-control"
                  placeholder="Nom"
                  v-model="dataForm.lastname"
                />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label"> Email </label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="dataForm.email"
                />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label"> Mot de passe</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mot de passe"
                  v-model="dataForm.password"
                />
              </div>

              <div class="form-check">
                <input
                  type="radio"
                  id="sex"
                  name="genre"
                  value="homme"
                  v-model="dataForm.sex"
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
                  v-model="dataForm.sex"
                  required
                  @click="user_is_a_woman"
                  class="form-check-input"
                  checked
                />
                <label class="form-check-label" for="sex"> Femme </label>
              </div>
              <div class="d-grid col-12 mx-auto">
                <router-link id="redirection-Home" to="/login"
                  ><button
                    class="btn btn-primary"
                    id="btn-signup"
                    type="submit"
                  >
                    S'inscrire
                  </button>
                </router-link>
              </div>

              <h2>{{ errMsg }}</h2>
              <p class="text-center mt-3" id="link-signup">
                Vous avez déjà un compte?
                <router-link
                  class="text-primary"
                  id="redirection-login"
                  to="/login"
                  >connecter-vous</router-link
                >
              </p>
            </form>
          </div>
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
      dataForm: {
        firstname: null,
        lastname: null,
        username: null,
        grade: null,
        sex: null,
        email: null,
        password: null,
      },
      errMsg: null,
    };
  },
  methods: {
    dataSignup() {
      const formData = new FormData();

      formData.append("firstname", this.dataForm.firstname);
      formData.append("lastname", this.dataForm.lastname);
      formData.append("username", this.dataForm.username);
      formData.append("grade", this.dataForm.grade);
      formData.append("sex", this.dataForm.sex);
      formData.append("email", this.dataForm.email);
      formData.append("password", this.dataForm.password);
      console.log("firstname", this.dataForm.firstname);
      console.log("lastname", this.dataForm.lastname);
      console.log("username", this.dataForm.username);
      console.log("grade", this.dataForm.grade);
      console.log("email", this.dataForm.email);
      console.log("password", this.dataForm.password);
      console.log("sex", this.dataForm.sex);
      console.log("formData", formData);

      if (
        !this.dataForm.firstname ||
        !this.dataForm.lastname ||
        !this.dataForm.username ||
        !this.dataForm.grade ||
        !this.dataForm.sex ||
        !this.dataForm.email ||
        !this.dataForm.password
      ) {
        this.errMsg = "Svp, remplissez tous les champs du formulaire !";
      }
      console.log("formData12 :", formData);
      axios
        .post("http://localhost:3000/signup", formData)

        .then(() => {
          // localStorage.setItem("token", response.data.token);
          // console.log(response); //une fois le compte enregistré on remet les inputs "à 0"
          //Réinitialisation
          this.dataForm.email = null;
          this.dataForm.username = null;
          router.push({ path: "login" });
          //document.location.href = "http://localhost:8080/login";
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
