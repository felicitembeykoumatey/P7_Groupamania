<template>
  <main class="modifier">
    <form @submit.prevent="dataUpdate">
      <input
        type="text"
        class="form-control"
        id="username"
        placeholder=" username "
        v-model="member.username"
      />

      <input
        type="text"
        placeholder="Email"
        id="email"
        v-model="member.email"
      />
      <input
        type="grade"
        placeholder="Grade"
        id="grade"
        v-model="member.grade"
      />

      <br />

      <input
        type="radio"
        id="role"
        name="role"
        value="Administrateur"
        v-model="member.role"
        required
        @click="admin_true"
      />
      <label for="genre">Administrateur</label>
      <input
        type="radio"
        id="role"
        name="role"
        value="Utilisateur"
        v-model="member.role"
        required
        @click="isAdmin_false"
      />
      <label for="genre">Utilisateur simple</label>
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
  name: "Signup",
  data() {
    return {
      member: {
        username: null,
        role: null,
        email: null,
        password: null,
        grade: null,
      },
    };
  },
  methods: {
    dataUpdate(id) {
      const formData = new FormData();

      formData.append("username", this.member.username);

      formData.append("sex", this.member.role);
      formData.append("email", this.member.email);
      formData.append("password", this.member.password);
      formData.append("grade", this.member.grade);
      console.log("formData", formData);
      if (
        !this.member.username ||
        !this.member.role ||
        !this.member.email ||
        !this.member.password ||
        !this.membe.grade
      )
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
          this.member.role = null;
          this.member.email = null;
          this.member.password = null;
          this.member.grade = null;

          router.push({ path: "dashbord" });
          //document.location.href = "http://localhost:8080/login";
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
