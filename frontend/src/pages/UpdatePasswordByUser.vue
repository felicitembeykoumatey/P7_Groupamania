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
        <div v-if="msg" class="alert alert-danger mtb-2" role="alert">
          {{ msg }}
        </div>
        <form @submit.prevent="editPassword" class="justify-content-center">
          <div class="mb-3">
            <label for="username"> Nom d'utilisateur </label>
            <input
              type="text"
              id="username"
              placeholder="votre nom d'utilisateur"
              v-model="member.username"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label for="username"> Mon ancien mot de passe </label>
            <input
              type="password"
              id="username"
              placeholder="Entrer votre ancien mot de passe"
              v-model="member.oldPassword"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label for="username"> Mon nouveau mot de passe </label>
            <input
              type="password"
              id="username"
              placeholder="Entrer votre nouveau mot de passe"
              v-model="member.password"
              class="form-control"
            />
          </div>

          <!-- Button -->
          <input class="btn-success" type="submit" value="Valider" />
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

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
      } else {
        console.log("this.member.password");
        const formData = new FormData();
        formData.append("password", this.member.password);
        formData.append("oldPassword", this.member.oldPassword);
        console.log(this.member.password);
        console.log(this.member.oldPassword);
        console.log("yersy : ", localStorage.getItem("token"));
        axios
          .put("http://localhost:3000/editPassword", formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })

          .then((res) => {
            console.log(res);

            router.push({ path: "profil" });
          })
          .catch((error) => console.log(error));
      }
    },

    /*   dataUpdate(id) {
      const formData = new FormData();

      formData.append("username", this.member.username);
      formData.append("password", this.member.password);
      formData.append("oldPassword", this.member.oldPassword);

      if (!this.member.username || !this.member.password)
        axios.get("http://localhost:3000/one/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.setItem("token"),
          },
        }),
          console.log("formData12 :", formData);
      axios
        .put("http://localhost:3000/editPassword", formData)

        .then(() => {
          // localStorage.setItem("token", response.data.token);
          // console.log(response); //une fois le compte enregistré on remet les inputs "à 0"
          //Réinitialisation
          this.member.username = null;

          this.member.password = null;
          this.member.oldPassword = null;

          //router.push({ path: "dashbord" });
          //document.location.href = "http://localhost:8080/login";
        })
        .catch((error) => console.log(error));
    },*/
  },
};
</script>
