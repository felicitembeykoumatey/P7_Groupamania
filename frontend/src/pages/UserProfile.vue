<template>
  <div class="justify-content-center">
    <fragment>
      <NavBar />
    </fragment>
    <div class="row py-4 mt-2 ">
      <!--Informations d'utilisateur-->
<div class="col-3"> 
  <img v-if="member.sex == 'homme'" class="avatar" src="../assets/homme.png" alt=" avatar" /> 
 <img v-else class="avatar" src="../assets/femme.jpg" alt=" avatar" />
 <ul class="list-group">

     <li v-if="member.isAdmin == true" class="list-group-item">  
      <router-link class="redirection-profil" to="/dashboard">
              <button type="button" class="btn btn-info">
              <i class="fa fa-users m" aria-hidden="true"></i> <b> Gestion des utilisateurs</b>
            </button>
        </router-link>          
</li>
</ul>
</div>
<div class="col-9">
   <div class="card">
  <h5 class="card-header"> <b>Profil : <span v-if=" member.isAdmin == true">Administrateur</span>
  <span v-else>utilisateur</span></b></h5>
  <div class="card-body">
    <h5 class="card-title">Mes informations personnelles</h5>
    <p class="card-text">
    <ul>
           <li>username : {{ member.username }}  </li>
       <li>Nom et Prenom : {{ member.lastname }}  {{ member.firstname }} </li>
        <li>Fonction: {{ member.grade }} </li>
         <li>Sexe: {{ member.sex }} </li>
      </ul>
    </p>

      <div class="row d-flex justify-content-between">
     <div class="col-4">
 <router-link class="redirection-Home" to="/UpdateProfilByUser">
            <button type="button" class="btn btn-success">
              <i class="fa-solid fa-pencil"></i> <b>Modifier mon profil</b>
            </button>
          </router-link></div>
   <div class="col-4 d-grid gab-2">
           <router-link class="redirection-Home" to="/UpdatePasswordByUser">
            <button type="button" class="btn btn-warning">
              <i class="fa fa-key"></i> <b>Changer mon mot de passe</b>
            </button>
          </router-link></div>
 <div class="col-4 mb-3">
          <button
            v-on:click="deleteProfil(member.id)"
            type="button"
            class="btn btn-danger"
          >
            <i class="fa-solid fa-trash-can"></i> <b>Supprimer mon profil</b>
          </button></div>
      </div>
  </div>
</div>




        
        </div>
      
  
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"; // barre de navigateur
import axios from "axios";

import Footer from "@/components/Footer.vue";
export default {
  name: "userProfile",
  components: { NavBar, Footer },
  data() {
    return {
      user: [],
      member: [],
      username: "",
      email: "",
      lastname: "",
      firstname:"",
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
.avatar{
  width:100%;
  height: 170px;
}
</style>
