<template>
  <div class="mx-auto">
    <fragment>
      <NavBar />
    </fragment>
    <div class="row d-flex justify-content-center">
      <router-link class="redirection-posts" to="/profil">
        <i class="arrow fas fa-arrow-left fa-2x"></i>
      </router-link>

      <h3 class="welcome">Modifier mon mot-de-passe</h3>
      <div
        class="shadow-sm shadow-lg pt-5 p-3 mb-5 bg-white rounded col-md-6 col-sm-12"
      >
        <div v-if="alert" :class="color" role="alert">
          {{ alert }}
        </div>
        <form @submit.prevent="editPassword" class="justify-content-center">
          <div class="mb-3">
            <label for="username"> Nom d'utilisateur </label>
            <input
              type="text"
              placeholder="votre nom d'utilisateur"
              v-model="member.username"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label for="username"> Mon ancien mot de passe </label>
            <input
              type="password"
              placeholder="Entrer votre ancien mot de passe"
              v-model="member.oldPassword"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label for="password"> Mon nouveau mot de passe </label>
            <input
              type="password"
              placeholder="Entrer votre nouveau mot de passe"
              v-model="member.password"
              class="form-control"
            />
          </div>
          <input class="btn-success" type="submit" value="Valider" />
        </form>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import axios from "axios";
//import router from "../router";

import NavBar from "@/components/NavBar.vue"; // barre de navigateur
import Footer from "@/components/Footer.vue"; //Footer
//import store from '../store/index.js';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UpdatePasswordByUser",
  components: { NavBar, Footer },
  data() {
    return {
      member: {
        username: null,
        password: null,
        oldPassword: null,
      },
      alert: null,
      color: null,
    };
  },
  methods: {
    editPassword() {
      if (
        !this.member.username ||
        !this.member.password ||
        !this.member.oldPassword
      ) {
        this.alert = "Veillez remplir tous les champs !";
        this.color = "alert alert-danger mtb-2";
      } else {
        const formData = new FormData();
        formData.append("username", this.member.username);
        formData.append("password", this.member.password);
        formData.append("oldPassword", this.member.oldPassword);
        axios
          .put("http://localhost:3000/editPassword", formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.alert = res.data.message;
            this.color = "alert alert-success mtb-2";
          })
          .catch((error) => {
            this.alert = error.response.data.message;
            this.color = "alert alert-danger mtb-2";
            // console.log("message: " + error.response.data.message)
          });
      }
    },
  },
};
</script>
