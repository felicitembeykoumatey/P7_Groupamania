<template>
  <main class="modifier">

  <form @submit.prevent="dataUpdate">
  
     
      <input
        type="text"
        class="form-control"
        id="username"
         placeholder=" username "
        v-model="dataForm.username"
      />
      
      <input
        type="text"
        placeholder="Email"
        id="email"
        v-model="dataForm.email"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        id="password"
        v-model="dataForm.password"
      />

      <br />

      <input
        type="radio"
        id="role"
        name="role"
        value="Administrateur"
        v-model="dataForm.role"
        required
        @click="admin_true"
      />
      <label for="genre">Administrateur</label>
      <input
        type="radio"
        id="role"
        name="role"
        value="Utilisateur"
        v-model="dataForm.role"
        required
        @click="isAdmin_false"
      />
      <label for="genre">Utilisateur simple</label>
      <!-- Button -->
      <router-link class="redirection-Home" to="/dashbord"
        ><input class="btn-signup" type="submit" value="Valider"/>
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
      dataForm: {
       
        username: null,
        role: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    dataSignup() {
      const formData = new FormData();

      
      formData.append("username", this.dataForm.username);
     
      formData.append("sex", this.dataForm.role);
      formData.append("email", this.dataForm.email);
      formData.append("password", this.dataForm.password);
      console.log("formData", formData);
      if (
     
        !this.dataForm.username ||
        !this.dataForm.role ||
        !this.dataForm.email ||
        !this.dataForm.password
      ) 
      console.log("formData12 :", formData);
      axios
        .post("http://localhost:3000/update", formData)

        .then(() => {
          // localStorage.setItem("token", response.data.token);
          // console.log(response); //une fois le compte enregistré on remet les inputs "à 0"
          //Réinitialisation
           this.dataForm.username = null;
            this.dataForm.role = null;
          this.dataForm.email = null;
            this.dataForm.password = null;
         
          router.push({ path: "dashbord" });
          //document.location.href = "http://localhost:8080/login";
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
