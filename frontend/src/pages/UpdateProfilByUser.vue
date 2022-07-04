<template>
  <div class="mx-auto">
    <fragment>
      <NavBar />
    </fragment>
    <p class="welcome pt-3">Modification de mes informations</p>
    <div class="row d-flex justify-content-center">
      <router-link class="redirection-posts" to="/profil">
        <i class="fas fa-arrow-left fa-2x"></i>
      </router-link>
      <div
        class="shadow-sm shadow-lg pt-5 p-3 mb-5 bg-white rounded col-12 col-md-6 col-lg-4"
      >
        <div v-if="alert" :class="color" role="alert">
          {{ alert }}
        </div>

        <form @submit.prevent="updateData">
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
            <label for="grade"> Fonction </label>
            <input
              type="text"
              placeholder="Fonction"
              id="grade"
              v-model="member.grade"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="grade"> Email </label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              v-model="member.email"
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
import NavBar from "@/components/NavBar.vue"; //Navigateur
import Footer from "@/components/Footer.vue"; // Pieds de page
//import store from '../store/index.js';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UpdateProfilByUser",
  components: { NavBar, Footer },
  data() {
    return {
      member: {
        id: "",
        username: "",
        grade: "",
        email: "",
        password: "",
      },
      alert: null,
      color: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/me/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      .then((response) => {
        this.member = response.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    updateData() {
      const formData = new FormData();
      formData.append("id", this.member.id);
      formData.append("username", this.member.username);
      formData.append("grade", this.member.grade);
      formData.append("email", this.member.email);

      axios
        .put("http://localhost:3000/updateByUser", formData)

        .then((res) => {
          this.member.id = null;
          this.member.username = null;
          this.member.grade = null;
          this.member.email = null;
          this.alert = res.data.message;
          this.color = "alert alert-success mtb-2";
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
