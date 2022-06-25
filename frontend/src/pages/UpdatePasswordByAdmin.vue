<template>
  <div class="mx-auto">
    <fragment>
      <NavBar />
    </fragment>
    <div class="row d-flex justify-content-center">
      <router-link class="redirection-posts mt-4" to="/dashboard">
        <i class="arrow fas fa-arrow-left fa-2x"></i>
      </router-link>

      <p class="welcome">Modification Mot-de-passe de l'utilisateur</p>
      <div
        class="shadow-sm shadow-lg pt-5 p-3 mb-5 bg-white rounded col-md-6 col-sm-12"
      >
        <div v-if="alert" :class="color" role="alert">
          {{ alert }}
        </div>
        <form @submit.prevent="dataUpdate" class="justify-content-center">
          <div class="mb-3">
            <label for="username"> Nom d'utilisateur </label>
            <input
              type="text"
              id="username"
              placeholder=" username "
              v-model="member.username"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              placeholder="Entrez votre  nouveau mot de passe"
              id="newPassword"
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
//import router from "../router";
import NavBar from "@/components/NavBar.vue"; //Navigateur
import Footer from "@/components/Footer.vue"; // Pieds de page

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UpdatePasswordByAdmin",
  components: { NavBar, Footer },
  data() {
    return {
      member: {
        id: "",
        username: "",
        password: "",
      },
      alert: null,
      color: null,
    };
  },
  mounted(id) {
    (id = window.localStorage.getItem("token_modify_password")),
      axios
        .get("http://localhost:3000/updateUser/" + id, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.member.username = res.data.username;
          this.member.password = res.data.password;
          this.id = res.data.id;
        })
        .catch((error) => console.log("Erreur", error));
  },
  methods: {
    dataUpdate() {
      const formData = new FormData();
      formData.append("id", this.id);
      formData.append("username", this.member.username);
      formData.append("password", this.member.password);

      axios
        .put("http://localhost:3000/modifyPassword", formData)
        .then((res) => {
          this.alert = res.data.message;
          this.color = "alert alert-success mtb-2";
          //console.log(" res.data.message");
          // router.push({ path: "dashboard" });
        })
        .catch((error) => {
          this.alert = error.response.data.message;
          this.color = "alert alert-danger mtb-2";
          // console.log("message: " + error.response.data.message)
        });
    },
  },
};
</script>
