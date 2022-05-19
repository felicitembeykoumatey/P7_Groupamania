<template>
  <body class="mx-auto">
    <fragment>
      <NavBar />
    </fragment>

    <router-link class="redirection-posts" to="/profil">
      <i class="fas fa-arrow-left fa-2x"></i>
    </router-link>
    <div
      class="shadow-sm shadow-lg pt-5 p-3 mb-5 bg-white rounded col-12 col-md-6 col-lg-4"
    >
      <form @submit.prevent="updateData">
        <div class="mb-3">
          <label for="username"> Username </label>
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

        <br />
        <input class="btn-update" type="submit" value="Modifier" />
      </form>
    </div>
    <Footer />
  </body>
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
      username: "",
      grade: "",
      email: "",
      password: "",

      member: [],
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
    updateData(id) {
      const formData = new FormData();
      //console.log("this.dataForm", this.dataForm);

      formData.append("id", this.member.id);
      formData.append("username", this.member.username);
      formData.append("sex", this.member.grade);
      formData.append("email", this.member.email);
      formData.append("password", this.member.password);

      axios
        .put("http://localhost:3000/updateByUser/" + id, formData)
        .then(() => {
          // localStorage.setItem("token", response.data.token);
          // console.log(response); //une fois le compte enregistré on remet les inputs "à 0"
          //Réinitialisation

          this.member.id = null;
          this.member.username = null;
          this.member.grade = null;
          this.member.email = null;
          this.member.password = null;

          router.push({ path: "profil" });
          //document.location.href = "http://localhost:8080/login";
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
