<template>
  <div class="mx-auto">
    <fragment>
      <NavBar />
    </fragment>
    <div class="row d-flex justify-content-center">
      <router-link class="redirection-posts" to="/dashboard">
        <i class="fas fa-arrow-left fa-2x"></i>
      </router-link>
      <p class="welcome">Modification des informations de l'utilisateur</p>
      <div
        class="shadow-sm shadow-lg pt-5 p-3 mb-5 bg-white rounded col-md-6 col-sm-12"
      >
        <form @submit.prevent="updateData" class="justify-content-center">
          <div class="mb-3">
            <label for="username"> Nom d'utilisateur </label>
            <input
              type="text"
              id="username"
              placeholder=" username "
              v-model="dataForm.username"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="grade"> Fonction </label>
            <input
              type="text"
              placeholder="Fonction"
              id="grade"
              v-model="dataForm.grade"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="grade"> Email </label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              v-model="dataForm.email"
              class="form-control"
            />
          </div>
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
import NavBar from "@/components/NavBar.vue"; //Navigateur
import Footer from "@/components/Footer.vue"; // Pieds de page
//import store from '../store/index.js';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UpdateProfilByUser",
  components: { NavBar, Footer },
  data() {
    return {
      dataForm: {
        username: "",
        grade: "",
        email: "",
        id: "",
      },
      member: [],
    };
  },
  mounted(id) {
    (id = window.localStorage.getItem("token_modify")),
      console.log("Idzsedfrh : ", id);
    axios
      .get("http://localhost:3000/updateUser/" + id, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("resdfh", this.dataForm.email);
        this.dataForm.username = res.data.username;
        this.dataForm.grade = res.data.grade;
        this.dataForm.email = res.data.email;
        this.dataForm.id = res.data.id;
      })
      .catch((error) => console.log("Erreur", error));
  },

  methods: {
    log(commmentaire, variable) {
      console.log(commmentaire, variable);
    },

    updateData() {
      const formData = new FormData();
      //console.log("this.dataForm", this.dataForm);
      console.log("this.member", this.dataForm);
      formData.append("id", this.dataForm.id);
      formData.append("username", this.dataForm.username);
      formData.append("email", this.dataForm.email);
      formData.append("grade", this.dataForm.grade);
      console.log("id", this.dataForm.id);
      console.log("username", this.dataForm.username);
      console.log("email", this.dataForm.email);
      axios
        .put("http://localhost:3000/updateByUser", formData)
        .then(() => {
          // localStorage.setItem("token", response.data.token);
          // console.log(response); //une fois le compte enregistré on remet les inputs "à 0"
          /*Réinitialisation
          this.member.username = null;
          this.member.grade = null;
          this.member.email = null;*/

          router.push({ path: "profil" });
          //document.location.href = "http://localhost:8080/login";
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
