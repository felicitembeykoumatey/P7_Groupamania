<template>
  <div><NavBar /></div>
  <div class="container-fluid vh-100" style="margin-top: 300px">
    <div style="margin-top: 200px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 class="text-primary">Connexion</h3>
          </div>

          <div class="row pt-5">
            <div class="col-lg-6 offset-lg-3 col-sm-12">
              <div v-if="msg" class="alert alert-danger" role="alert">
                {{ msg }}
              </div>
              <div class="p-1">
                <form @submit.prevent="userLogin">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      v-model="dataForm.email"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label"
                      >Mot de passe</label
                    >
                    <input
                      type="password"
                      id="password"
                      placeholder="Mot de passe"
                      name="password"
                      v-model="dataForm.password"
                      class="form-control"
                    />
                  </div>

                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      checked="checked"
                      name="remember"
                      class="form-check-input"
                      id="Check"
                    />
                    <label class="form-check-label" for="Check">
                      Souviens-toi de moi.</label
                    >
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Se connecter
                  </button>
                </form>

                <p>
                  <small>
                    Pas de compte?
                    <router-link class="redirection-singup" to="/signup"
                      >S'inscrire</router-link
                    >
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--
 
     

      <p>
        <small>
          Pas de compte?
          <router-link class="redirection-singup" to="/signup"
            >S'inscrire</router-link
          >
        </small>
      </p>-->
    </div>
  </div>
  <Footer />
</template>
<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import router from "../router";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: { NavBar, Footer },
  data() {
    return {
      dataForm: {
        email: "",
        password: "",
      },
      msg: null,
    };
  },

  methods: {
    userLogin() {
      const formData = new FormData();
      formData.append("email", this.dataForm.email);
      formData.append("password", this.dataForm.password);
      console.log("this.dataForm.email :", this.dataForm.email);
      console.log("this.dataForm.password : ", this.dataForm.password);
      if (!this.dataForm.email || !this.dataForm.password) {
        this.msg = "Erreur de saisie";
      } else {
        axios
          .post("http://localhost:3000/login", formData)
          .then((response) => {
            console.log("response : ", response);
            localStorage.setItem("token", response.data.token);
            router.push({ path: "posts" });
            //document.location.href = "http://localhost:8080/posts";
          })
          .catch((error) => {
            console.log(error);
            alert(
              `Le mot de passe ou l'utilisateur n'est pas valide. ${error}`
            );
          });
      }
    },
  },
};
</script>

<style scoped lang="CSS"></style>
