<template>
  <div>
    <div class="row mx-auto">
      <div class="col-md-6">
        <fragment>
          <NavBar />
        </fragment>

        <div
          v-if="alert"
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Erreur</strong> {{ alert }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>

        <router-link class="redirection-posts" to="/profil">
          <i class="arrow fas fa-arrow-left fa-2x"></i>
        </router-link>
        <form class="row" @submit.prevent="editPassword">
          <div class="col-12">
            <input
              type="text"
              placeholder="votre nom d'utilisateur"
              id="username"
              v-model="member.username"
            />
          </div>
          <div class="col-12">
            <input
              type="password"
              placeholder="Ancien Mot de passe"
              id="oldPassword"
              v-model="member.oldPassword"
            />
          </div>
          <div class="col-12">
            <input
              type="password"
              placeholder="Nouveau Mot de passe"
              id="password"
              v-model="member.password"
            />
          </div>

          <!-- Button -->

          <input class="btn-signup" type="submit" value="Valider" />
        </form>
      </div>
    </div>

    <Footer />
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
        const formData = new FormData();
        formData.append("password", this.member.password);
        formData.append("oldPassword", this.member.oldPassword);
        console.log(this.member.password);
        console.log(this.member.oldPassword);

        axios
          .put("http://localhost:3000/editPassword", formData, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
          })

          .then((res) => {
            console.log(res);

            //router.push({ path: "dashbord" });
            //document.location.href = "http://localhost:8080/login";
          })
          .catch((error) => console.log(error));
      }
    },

    dataUpdate(id) {
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
        .put("http://localhost:3000/updatePassword", formData)

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
    },
  },
};
</script>
