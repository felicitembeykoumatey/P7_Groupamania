<template>
  <div>
    <router-link class="redirection-posts" to="/posts">
      <i class="arrow fas fa-arrow-left fa-2x"></i>
    </router-link>
    <h2>Tableau de bord</h2>

    <div class="dashboard-table">
      <table class="tableau-style" id="table">
        <thead id="thead">
          <tr class="color">
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Rôle</th>
            <th scope="col">Modifier Rôle</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody id="tbody" v-for="member in users" :key="member.id">
          <tr class="color">
            <router-link
              @click="getUser(member.id)"
              class="redirection-Home"
              to="/UpdatePasswordByAdmin"
            >
              <td class="idnum">{{ member.id }}</td></router-link
            >
            <router-link
              @click="getUser(member.id)"
              class="redirection-Home"
              to="/UpdateProfilByAdmin"
              ><td class="user">{{ member.username }}</td></router-link
            >
            <td class="email">{{ member.email }}</td>
            <td class="isAdmin">{{ member.isAdmin }}</td>
            <td class="updateUser">
              <button
                @click="updateUser(member.id, member.isAdmin)"
                class="btn btn-danger"
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
  </div>
</template>

<script>
import axios from "axios"; // importation dépendance axios pour envoyer et recupérer les données.
import router from "../router";
export default {
  name: "AdminDashbord",
  data() {
    return {
      member: [], //je récupère les infos de la personnes connectée
      users: [],
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
        console.log("res : ", res);
        this.users = res.data;
        console.log("this.users : ", this.users);
        //console.log("this.users:", this.users);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    getUser(id) {
      const formData = new FormData(); // Formulaire vide à cet instant
      //ajouter un couple clé/valeur en utilisant FormData.append
      formData.append("id", id);

      axios
        .get("http://localhost:3000/me", formData, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("res", res);
          router.push({ path: "dashbord" });
          window.location.reload();
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
            //localStorage.clear();
            // router.push({ path: "dashbord" });
            //  window.location.reload();
            document.location.href = "http://localhost:8080/dashbord";
          });
    },
    updateUser(userId, isAdmin) {
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
          router.push({ path: "dashbord" });
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
.fas {
  color: orangered;
}
.fa-solid {
  color: green;
}
</style>
