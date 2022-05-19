<template>
  <body class="modifier mx-auto">
    <fragment>
      <NavBar />
    </fragment>

    <router-link class="redirection-posts" to="/dashbord">
      <i class="arrow fas fa-arrow-left fa-2x"></i>
    </router-link>
    <form @submit.prevent="dataUpdate">
      <input
        type="password"
        placeholder="Entrez votre  nouveau mot de passe"
        id="password"
        v-model="member.password"
        class="form-control"
      />

      <!-- Button -->
      <input class="btn-success" type="submit" value="Valider" />
    </form>
    <Footer />
  </body>
</template>

<script>
import axios from "axios";
import router from "../router";
import NavBar from "@/components/NavBar.vue"; //Navigateur
import Footer from "@/components/Footer.vue"; // Pieds de page

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UpdatePasswordByAdmin",
  components: { NavBar, Footer },
  data() {
    return {
      username: "",
      password: "",
      id: "",

      member: [],
    };
  },
  mounted(id) {
    (id = window.localStorage.getItem("token_modify_password")),
      //   console.log("Je suis dans mounted : j'affiche id : ", id);
      axios
        .get("http://localhost:3000/updateUser/" + id, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.username = res.data.username;
          this.password = res.data.password;
          this.id = res.data.id;
        })
        .catch((error) => console.log("Erreur", error));
  },
  methods: {
    dataUpdate() {
      const formData = new FormData();
      formData.append("password", this.member.password);
      formData.append("id", this.id);

      axios
        .put("http://localhost:3000/updatePassword", formData)

        .then(() => {
          this.member.password = null;
          router.push({ path: "dashboard" });

          console.log("formData", formData);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
