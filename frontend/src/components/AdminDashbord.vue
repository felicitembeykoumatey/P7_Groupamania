<template>
  <div class="justify-content-center">
    <fragment>
      <NavBar />
    </fragment>
    <router-link class="redirection-posts" to="/posts">
      <i class="arrow fas fa-arrow-left fa-2x"></i>
    </router-link>
    <h2 class="text-center">Tableau de bord</h2>

    <div class="table-responsive-sm table-responsive-md table-responsive-lg">
      <table class="tableau-style table-secondary" id="table">
        <thead id="thead">
          <tr class="color">
            <th scope="col">Changer mot de passe</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Administrateur</th>
            <th scope="col">Modifier Rôle</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>

        <tbody id="tbody" v-for="member in users" :key="member.id">
          <tr class="color">
            <td class="idnum">
              Identifiant d'utilisateur {{ member.id }}
              <button @click="getUser(member.id)">
                <i class="fa-solid fa-pencil"></i><span> Mdp</span>
              </button>
            </td>

            <td class="username">
              {{ member.username }}
              <button @click="modifyprofiluser(member.id)">
                <i class="fa-solid fa-pencil"></i
                ><span> Nom d'utilisateur</span>
              </button>
            </td>

            <td class="email">{{ member.email }}</td>
            <td class="isAdmin text-center">{{ member.isAdmin }}</td>

            <td>
              <button
                @click="updateUserRole(member.id, member.isAdmin)"
                class="btn btn-success"
              >
                <i class="fa-solid fa-pencil"></i>
              </button>
            </td>

            <td class="delete">
              <button @click="deleteUsers(member.id)" class="btn btn-danger">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div><Footer /></div>
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
    };
  },
  mounted() {
    //Appel à l'API pour l'affichage de tous les utilisateurs
    axios
      .get("http://localhost:3000/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //console.log("res : ", res);
        this.users = res.data;
        // console.log("this.users : ", this.users);
        //console.log("this.users:", this.users);
      })
      .catch((error) => console.log(error));
  },
  methods: {
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
          //console.log("resdfh", res);
          localStorage.setItem("token_modify_password", id);
          router.push({ path: "UpdatePasswordByAdmin" });
          //window.location.reload();
        })
        .catch((error) => console.log("Erreur", error));
    },
    deleteUsers(id) {
      if (window.confirm("Etes-vous sûre de vouloir supprimer votre compte?"))
        axios
          .delete("http://localhost:3000/delete/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            document.location.href = "http://localhost:8080/dashboard";
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
        .then((res) => {
          console.log("res", res);
          //router.push({ path: "dashbord" });
          window.location.reload();
        })
        .catch((error) => console.log("Erreur", error));
    },
  },
};
</script>

<style scoped>
.tableau-style {
  border-collapse: collapse;
  min-width: 400px;
  width: auto;
  box-shadow: 0 50px 50px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
thead tr {
  background-color: rgb(48, 48, 139);
  color: white;
}
th,
td {
  padding: 15px 20px;
}
tbody tr,
td,
th {
  border: 1px solid #ddd;
}
.dashboard-table {
  display: flex;
  justify-content: center;
}
</style>
