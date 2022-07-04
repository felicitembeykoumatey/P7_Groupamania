<template>
  <div>
    <div class="row">
      <fragment>
        <NavBar />
      </fragment>
      <router-link class="redirection-posts" to="/profil">
        <i class="arrow fas fa-arrow-left fa-2x"></i>
      </router-link>
      <p class="welcome">Gestion des utilisateurs</p>
    </div>
       
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Email</th>
                <th scope="col">Changer mot de passe de :</th>

                <th scope="col" class="sm-col">Rôle de l'utilisateur</th>

                <th scope="col" class="sm-col1">Actions</th>
              </tr>
            </thead>

            <tbody v-for="member in users" :key="member.id">
              <tr>
                <td>
                  {{ member.id }}
                </td>
                <td>{{ member.email }}</td>

                <td>
                  {{ member.username }}
                  <button
                    @click="getUser(member.id)"
                    class="btn mr-2 btn-info btn-sm"
                  >
                    <i class="fa fa-lock"></i>
                  </button>
                </td>

                <td>
                  <button
                    @click="updateUserRole(member.id, member.isAdmin)"
                    v-if="member.isAdmin == '1'"
                    class="btn btn-outline-success"
                  >
                    Administrateur
                  </button>
                  <button
                    @click="updateUserRole(member.id, member.isAdmin)"
                    v-else
                    class="btn btn-outline-warning"
                  >
                    Utilisateur
                  </button>
                </td>

                <td>
                  <button
                    @click="modifyprofiluser(member.id)"
                    class="btn btn-info btn-sm mrigth"
                  >
                    <i class="fa-solid fa-pencil"></i>
                  </button>
 <div v-if="alert" :class="color" role="alert">
          {{ alert }}
        </div>
                  <button
                    @click="deleteUsers(member.id)"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-4"><Footer /></div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // importation dépendance axios pour envoyer et recupérer les données.
import router from "../router"; // router
import NavBar from "@/components/NavBar.vue"; // barre de navigateur
import Footer from "@/components/Footer.vue"; //Footer

export default {
  components: { NavBar, Footer },
  name: "AdminDashbord",
  data() {
    return {
      member: [], //Récupèrer les infos de la personne connectée.
      users: [], //Récupèrer les infosdes utilisateurs.
       alert: null,
      color: null,
    };
    
  },
  mounted() {
    //Appel à l'API pour l'affichage de tous les utilisateurs
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      axios
        .get("http://localhost:3000/all", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => console.log(error));
    },

    modifyprofiluser(id) {
      // Récuperer des informations d'un utilisateur grâce à son id.
      axios
        .get("http://localhost:3000/updateUser/" + id, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then(() => {
          localStorage.setItem("token_modify", id);
          router.push({ path: "UpdateProfilUserByAdmin" });
        })
        .catch((error) => console.log("Erreur", error));
    },

    getUser(id) {
      const formData = new FormData(); // Formulaire vide à cet instant
      //ajouter un couple clé/valeur en utilisant FormData.append
      formData.append("id", id);

      axios
        .get("http://localhost:3000/updateUser/" + id, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then(() => {
         
          localStorage.setItem("token_modify_password", id);
         //   this.getAllUsers();
         // localStorage.setItem("token_modify_password", id);
          router.push({ path: "UpdatePasswordByAdmin" });
        })
        .catch((error) => console.log("Erreur", error));
    },

    //Suppression
    deleteUsers(id) {
      if (window.confirm("Etes-vous sûre de vouloir supprimer ce compte?"))
        axios
          .delete("http://localhost:3000/delete/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.getAllUsers();
           this.alert = res.data.message;
          this.color = "alert alert-success mtb-2";
           
        
          });
    },
    updateUserRole(userId, isAdmin) {
      const formData = new FormData(); // Formulaire vide à cet instant
      //ajouter un couple clé/valeur en utilisant FormData.append
      formData.append("isAdmin", isAdmin);
      formData.append("userId", userId);
      axios
        .put("http://localhost:3000/updateRole", formData, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then(() => {
        
          this.getAllUsers();
        })
        .catch((error) => console.log("Erreur", error));
    },
  },
};
</script>

<style scoped>
thead tr {
  background-color: rgb(48, 48, 139);
  color: white;
  text-align: center;
}
.sm-col {
  width: 200px;
  text-align: center;
}
.sm-col1 {
  width: 100px;
  text-align: center;
}
tbody tr {
  text-align: center;
}
.mrigth {
  margin-right: 10px;
}
</style>
