<template>
  <body class="container">
    <router-link class="redirection-posts" to="/posts">
      <i class="fas fa-arrow-left fa-2x"></i>
    </router-link>
    <div class="row">
      <!--Informations d'utilisateur-->

      <div class="pt-2 d-flex justify-content-end"><Disconect /></div>

      <section
        id="profil_user"
        class="shadow-sm shadow-lg p-3 mb-5 bg-white rounded col-12 col-md-6 col-lg-4"
      >
        <img class="img-fluid" src="../assets/avatar.webp" alt=" avatar" />

        <!--Symbole genre masculin/feminin-->
        <div class="text-center">
          <i v-if="member.sex === 'femme'" class="fas fa-venus">femme</i>

          <i v-else class="fas fa-mars"> Homme </i>
          <br />
          <p>
            Je m'appelle <b> {{ member.username }}</b
            ><br />
            J'occupe le poste <b>{{ member.grade }} chez Groupomania</b>. <br />
            Mon email : <b>{{ member.email }}</b>
            <br />
            <b>Administrateur : {{ member.isAdmin }}</b>
          </p>
        </div>

        <div class="container">
          <button
            v-on:click="deleteProfil(member.id)"
            type="button"
            class="btn btn-danger"
          >
            <i class="fa-solid fa-trash-can"> </i>
          </button>

          <router-link class="redirection-Home" to="/UpdateProfilByUser">
            <button type="button" class="btn btn-success">
              <i class="fa-solid fa-pencil"></i><b>Modifier profil</b>
            </button>
          </router-link>

          <router-link class="redirection-Home" to="/UpdatePasswordByUser">
            <button type="button" class="btn btn-warning">
              <i class="fa fa-key"></i><b>Changer Mot de passe</b>
            </button>
          </router-link>
        </div>
      </section>

      <h2>{{ log("member ", member.id) }}</h2>
      <br />
    </div>
    <Footer />
  </body>
</template>

<script>
import axios from "axios";
import Disconect from "@/components/Disconect";
import Footer from "@/components/Footer.vue";
export default {
  name: "userProfile",
  components: { Disconect, Footer },
  data() {
    return {
      user: [],
      member: [],
      username: "",
      email: "",
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      .then((response) => {
        console.log("response", response);
        this.member = response.data;
        console.log("member :", this.member);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    log(commmentaire, variable) {
      console.log(commmentaire, variable);
    },
    deleteProfil(id) {
      if (window.confirm("Etes-vous sûre de vouloir supprimer votre compte?"))
        axios
          .delete("http://localhost:3000/delete/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })

          .then(() => {
            localStorage.clear();
            document.location.href = "http://localhost:8080/signup";
          });
    },
  },
};
</script>
<style scoped>
#profil_user {
  margin: 10px;
}
</style>
