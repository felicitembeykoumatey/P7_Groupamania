<template>
  <div class="mx-auto">
    <fragment>
      <NavBar />
    </fragment>
    <div class="row d-flex justify-content-center">
      <router-link class="redirection-posts" to="/dashboard">
        <i class="arrow fas fa-arrow-left fa-2x"></i>
      </router-link>
      <p class="welcome pt-3">Modification des informations de l'utilisateur</p>
      <div
        class="shadow-sm shadow-lg pt-5 p-3 mb-5 bg-white rounded col-md-6 col-sm-12"
      >
        <div v-if="alert" :class="color" role="alert">
          {{ alert }}
        </div>
        <form @submit.prevent="updateData" class="justify-content-center">
          <div class="mb-3">
            <label for="username"> Nom d'utilisateur </label>
            <input
              type="text"
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
//import router from "../router";
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
        id: "",
        username: "",
        grade: "",
        email: "",
      },
      member: [],
      alert: null,
      color: null,
    };
  },
  mounted(id) {
    (id = window.localStorage.getItem("token_modify")),
      axios
        .get("http://localhost:3000/updateUser/" + id, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })

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

  methods: {
    //log(commmentaire, variable) {
    // console.log(commmentaire, variable);
    //},

    updateData() {
      const formData = new FormData();
      formData.append("id", window.localStorage.getItem("token_modify"));
      formData.append("username", this.dataForm.username);
      formData.append("email", this.dataForm.email);
      formData.append("grade", this.dataForm.grade);
      axios
        .put("http://localhost:3000/updateDataByAdmin", formData)

        .then((res) => {
          this.dataForm.username = null;
          this.dataForm.grade = null;
          this.dataForm.email = null;
          this.dataForm.id = null;
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
