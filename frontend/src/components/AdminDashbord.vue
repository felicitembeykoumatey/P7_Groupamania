<template>
  <div>
      <router-link class="redirection-posts" to="/posts">
      <i class="fas fa-arrow-left fa-2x"></i>
    </router-link>
    <h2>Tableau de bord</h2>

    <div>
    
      <table class="table table-bordered table-sm" id="table">
        <thead id="thead">
          <tr class="color">
            <th scope="col"></th>
                  <th scope="col">id</th>
            <th scope="col">username</th>
            <th scope="col">Email</th>
      
            <th scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody id="tbody" v-for="member in users" :key="member.id">
          <tr class="color">
            <td class="vide"></td>
              <td class="idnum">{{ member.id }}</td>
            <td class="user">{{ member.username }}</td>
            <td class="email">{{ member.email }}</td>
          
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
//import router from "../router";

export default{
  name:'AdminDashbord',

  data(){
    return {
       member: [], //je récupère les infos de la personnes connectée
      posts: [], //je récupère les posts de la personnes connectée
      comments: [],
      users:[],
    }
  },
   mounted (){ 

        //Appel à l'API pour l'affichage de tous les utilisateurs
        axios.get('http://localhost:3000/all',
                   {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
        .then(res=> {
          console.log("res : ",res)
          this.users = res.data
          console.log("this.users : ",this.users)
          //console.log("this.users:", this.users);
        })
        .catch(error => console.log(error))
    },

  methods: {

   deleteUsers(id){
     
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
  },
}
</script>