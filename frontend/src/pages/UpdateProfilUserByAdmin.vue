<template>
  <div class="mx-auto">
    <div class="text-center">
      <img
        src="../assets/icon-left-font-monochrome-black.svg"
        alt=" logo groupomania"
        class="d-inline-block align-text-top my-5"
      />
    </div>

    <router-link class="redirection-posts" to="/posts">
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
        <!-- Button 
      <router-link class="redirection-Home" to="/dashbord"
        >
      </router-link>-->
      </form>
    </div>
  </div>
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
        console.log("resdfh", res);
        this.username = res.data.username;
        this.grade = res.data.grade;
        this.email = res.data.email;
        this.id = res.data.id;
        console.log(" this.username", this.username);
        console.log("grade", this.grade);
        console.log("this.email", this.email);
        console.log("this.id", this.id);
      })
      .catch((error) => console.log("Erreur", error));
  },

  methods: {
    updateData() {
      const formData = new FormData();
      //console.log("this.dataForm", this.dataForm);

      console.log("this.member", this.member);
      formData.append("id", this.id);
      formData.append("username", this.member.username);
      formData.append("email", this.member.email);
      formData.append("grade", this.member.grade);
      console.log("id", this.id);
      console.log("username", this.member.username);
      console.log("email", this.member.email);
      axios
        .put("http://localhost:3000/updateByUser", formData)
        .then(() => {
          // localStorage.setItem("token", response.data.token);
          // console.log(response); //une fois le compte enregistré on remet les inputs "à 0"
          //Réinitialisation
          this.member.username = null;
          this.member.grade = null;
          this.member.email = null;

          router.push({ path: "profil" });
          //document.location.href = "http://localhost:8080/login";
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
