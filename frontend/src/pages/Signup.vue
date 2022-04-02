<template>
  <main class="signup-box">
    <h1>S'inscrire</h1>

    <form>
      <input
        type="text"
        class="form-control"
        id="firstname"
        placeholder="Prénom"
        v-model="dataForm.firstname"
      />
      <input
        type="text"
        class="form-control"
        id="lastname"
        placeholder="Nom"
        v-model="dataForm.lastname"
      />
      <input
        type="text"
        class="form-control"
        id="username"
        placeholder="Nom d'utilisateur"
        v-model="dataForm.username"
      />
      <input
        type="text"
        class="form-control"
        id="grade"
        placeholder="Fonction"
        v-model="dataForm.grade"
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
        id="sex"
        name="genre"
        value="homme"
        v-model="dataForm.sex"
        required
        @click="user_is_a_man"
      />
      <label for="genre">Homme</label>
      <input
        type="radio"
        id="sex"
        name="genre"
        value="femme"
        v-model="dataForm.sex"
        required
        @click="user_is_a_woman"
      />
      <label for="genre">Femme</label>
      <!-- Button -->
      <router-link class="redirection-Home" to="/login"
        ><button @click="dataSignup" class="btn-signup" type="submit">
          S'inscrire
        </button>
      </router-link>
    </form>
    <h2>{{ errMsg }}</h2>
    <p class="link-signup">
      Vous avez déjà un compte,
      <router-link class="redirection-login" to="/login"
        >connecter-vous</router-link
      >
    </p>
  </main>
</template>

<script>
import axios from "axios";
//import router from '../router';
//import store from '../store/index.js';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Signup",
  data() {
    return {
      dataForm: {
        firstname: null,
        lastname: null,
        username: null,
        grade: null,
        sex: null,
        email: null,
        password: null,
      },
      errMsg: null,
    };
  },
  methods: {
    dataSignup() {
      const formData = new FormData();
      console.log("formData", formData);
      formData.append("firstname", this.dataForm.firstname);
      formData.append("lastname", this.dataForm.lastname);
      formData.append("username", this.dataForm.username);
      formData.append("grade", this.dataForm.grade);
      formData.append(" sex", this.dataForm.sex);
      formData.append("email", this.dataForm.email);
      formData.append(" password", this.dataForm.password);

      if (
        !this.dataForm.firstname ||
        !this.dataForm.lastname ||
        !this.dataForm.username ||
        !this.dataForm.grade ||
        !this.dataForm.sex ||
        !this.dataForm.email ||
        !this.dataForm.password
      ) {
        this.errMsg = "Svp, remplissez tous les champs du formulaire !";
        return;
      }
      const passwordValidator = require("vee-validate");
      const passValid = new passwordValidator();

      passValid
        .is()
        .min(8)
        .is()
        .max(50)
        .has()
        .uppercase()
        .has()
        .lowercase()
        .has()
        .digits(2)
        .has()
        .not()
        .spaces()
        .is()
        .not()
        .oneOf(["Passw0rd", "Password123"]);

      if (!passValid.validate(!this.dataForm.password)) {
        this.errMsg =
          "Password Err! => entre 8 et 32 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial";
        return;
      }

      axios
        .post("http://localhost:3000/signup", formData)
     
           .then((response) => {
            localStorage.setItem("token", response.data.token);
          console.log(response); //une fois le compte enregistré on remet les inputs "à 0"
          //Réinitialisation
          this.dataForm.email = null;
          this.dataForm.username = null;

          document.location.href = "http://localhost:8080/login";
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
