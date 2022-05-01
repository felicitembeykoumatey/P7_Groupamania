<template>
  <main class="modifier">
    <form @submit.prevent="updateData">
      <label for="username"> Username </label>
      <input
        type="text"
        class="form-control"
        id="username"
        placeholder=" username "
        v-model="member.username"
      />

      <label for="grade"> Fonction </label>
      <input
        type="text"
        placeholder="Fonction"
        id="grade"
        v-model="member.grade"
      />

      <label for="grade"> Email </label>
      <input
        type="text"
        placeholder="Email"
        id="email"
        v-model="member.email"
      />

      <!-- <label for="password"> Password </label>
      <input
        type="password"
        placeholder="Mot de passe"
        id="password"
        v-model="member.password"
      />
 -->
      <br />
      <input class="btn-signup" type="submit" value="Valider" />
      <!-- Button 
      <router-link class="redirection-Home" to="/dashbord"
        >
      </router-link>-->
    </form>
  </main>
</template>

<script>
import axios from "axios";
import router from "../router";
//import store from '../store/index.js';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UpdateProfilByUser",
  data() {
    return {
      dataForm: {
        username: null,
        grade: null,
        email: null,
        password: null,
      },
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
      console.log("this.member", this.member);
      formData.append("id", this.member.id);
      formData.append("username", this.member.username);
      formData.append("sex", this.member.grade);
      formData.append("email", this.member.email);
      formData.append("password", this.member.password);
      console.log("id", this.member.id);
      console.log("username", this.member.username);
      console.log("sex", this.member.grade);
      console.log("email", this.member.email);
      console.log("password", this.member.password);
      /*if (
        !this.member.username ||
        !this.member.grade ||
        !this.member.email ||
        !this.member.password
      ) */

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
