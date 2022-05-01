<template>
  <main class="modifier">
    <form @submit.prevent="dataUpdate">
      <input
        type="password"
        placeholder="Mot de passe"
        id="password"
        v-model="member.password"
      />

      <!-- Button -->
      <router-link class="redirection-Home" to="/dashbord"
        ><input class="btn-signup" type="submit" value="Valider" />
      </router-link>
    </form>
  </main>
</template>

<script>
import axios from "axios";
import router from "../router";
//import store from '../store/index.js';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UpdatePasswordByAdmin",
  data() {
    return {
      member: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    dataUpdate(id) {
      const formData = new FormData();

      formData.append("username", this.member.username);

      formData.append("password", this.member.password);

      console.log("password", this.member.password);
      console.log("username", this.member.username);

      console.log("formData", formData);
      if (!this.member.username || !this.member.password)
        axios.get("http://localhost:3000/one/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.setItem("token"),
          },
        }),
          console.log("formData12 :", formData);
      axios
        .post("http://localhost:3000/update", formData)

        .then(() => {
          // localStorage.setItem("token", response.data.token);
          // console.log(response); //une fois le compte enregistré on remet les inputs "à 0"
          //Réinitialisation
          this.member.username = null;

          this.member.password = null;

          router.push({ path: "dashbord" });
          //document.location.href = "http://localhost:8080/login";
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
