<template>
  <header>
    <router-link class="redirection-posts" to="/posts">
      <i class="fas fa-arrow-left fa-2x"></i>
    </router-link>
    <main>
      <!--Informations d'utilisateur-->

      <div class="BoutonDisconect"><Disconect /></div>
      <section class="description_user">
        <h2>Je m'appelle {{ member.username }}</h2>
        <h3>J'occupe le poste {{ member.grade }} chez Groupomania.</h3>
        <!--Symbole genre masculin/feminin-->
        <i v-if="member.sex === 'femme'" class="fas fa-venus"> Femme</i>

        <i v-else class="fas fa-mars"> Homme</i>

        <p>Mon email : {{ member.email }}</p>

        <p>Admin : {{ member.isAdmin }}</p>
      </section>
      <h2>{{ log("member ", member.id) }}</h2>
      <br />

      <button
        v-on:click="deleteProfil(member.id)"
        type="submit"
        class="btn-deletecount"
      >
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <Footer />
    </main>
  </header>
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
