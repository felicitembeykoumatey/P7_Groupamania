<template>
<main>

<form>
    <div class="BoutonDisconect">
          <Disconect/> 
        </div>

<p> Bienvenu(e){{ user.username }}
  <router-link class="redirection-profil" to="/profil"><span class="cacher">aaaa</span>
  <p v-if="user.attachementuser">
  <img class="image-profil" :src="user.attachementuser" alt="..."  /></p><p class="profilsansphoto" v-else>Mon profil</p></router-link>

 </p>


<div class="form-group">
          <label for="title"><span>Titre</span> </label><br>
          <input type="text" class="form-control" id="title" v-model="dataPost.title" />
</div>

<div class="form-group">

 <label for="content"><span>Quoi de neuf ?</span></label><br>
  <textarea id="content" v-model="dataPost.content" style="height:100px"></textarea>
</div>

  <label for="file"><span class="cacher">aaaa</span></label>
  <div class="btn-upload">
       <input name="file" type="file" class="upload" id="imgUrl" @change="onFileChanged"/>
   </div>

<button @click.prevent="SendPost" type="submit" class="btn-publier"><span class="cacher">aaaa</span><i class="fas fa-arrow-circle-up"></i></button>
 <div class="container2">
      <div class="actuality"><h1>Fil d'actualité</h1>
      <ul id="l">
     <li v-for="item in posts" :key="item.id"> 
      <span>{{ item.title }}<br></span>
     <p v-if="item.User.attachementuser">
     <img class="image-profil" :src="item.User.attachementuser" alt="..."  /><br></p>
      <i>Publié par <strong>{{ item.User.username }}</strong> le {{item.createdAt.split('T')[0]}} à {{item.createdAt.slice(11,16)}}<br><br></i>
      <div class="contenu"> {{ item.content }} <br></div>
   

      <p v-if="item.attachement" >
       <img :src="item.attachement" alt="..."  /></p> <!-- j'affiche l'image uniquement si il y en a une-->
      <p v-if="user.id==item.userId || user.isAdmin">  <button @click.prevent="DeleMessage(item.id, item.userId)" id="btn-sup" type="submit" class="btn btn-primary"><span class="cacher">aaaa</span><i class="fas fa-trash-alt"></i></button> </p>    
      
     
      </li>
      </ul>
     
     </div>
     </div>
    
</form>

</main>
</template>

<script>
import Disconect from '@/components/Disconect.vue'; 
import Footer from '@/components/Footer.vue';
import axios from "axios";

export default {
      name: "Post",
components: {Disconect, Footer},
data(){
    return{
        dataPost: {
title:"",
content:"",
imageUrl:""
        },
         posts: [], //Recupérer les informations des posts
         user:[], // Recupérer les informations de la personne connectée
    };
},

// Methode fonction mounted pour récupérer les données d'utilisateur connecté

mounted(){
    axios.get("http://localhost:3000/login", {
        headers:{
            Authorization: "Bearer"+ localStorage.getItem("token")
         }
    })

    .then(response => this.user=response.data)
    .catch(error => console.log(error))

     axios
        .get("http://localhost:3000/posts", //je récupère les  postes
        
        {  
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token") //je récupère la clé présent dans le local storage
            }
          })
        
        .then(response => {
          console.log(response);
          this.posts = response.data
          
        })
        .catch(error => console.log(error));
},  



  onFileChanged (event) { //me permet de charger un fichier (une image) au click
    this.dataPost.selectedFile = event.target.files[0];
    console.log(this.dataPost.selectedFile)
  },


 DeleMessage (id, userIdOrder) { //'jenvoie l'id du post selectionné ainsi que l'id de la personne qui a créé le message
    if (
        window.confirm("Voulez vous vraiment supprimer le post?")
      )
    axios
          .delete("http://localhost:3000/posts"+id,{data:{userIdOrder}, //je récupère les éléments que je souhaite poster
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token") //je récupère la clé présent dans le local storage
            },
        })
        .then(() => {
          window.location.reload();
        })
        .catch(error => console.log(error));
     
  },

  methods: {
 SendPost() { 
  const formData = new FormData();
  formData.append('title', this.dataPost.title); //.append créé une clé de valeur en récupérant la valeur des inputs (name = 'title' value='this.dataPost...')
  formData.append('content', this.dataPost.content);
  formData.append('inputFile', this.dataPost.selectedFile);
if (formData.get("title") !== null && formData.get("content") !== null
     //.get renvoie la valeur associé a une clé créé précédement (ex: valeur de 'title' est le resulat de this.dataPost.title)   
      ) {
        axios
          .post("http://localhost:3000/posts", formData,{ //je récupère les éléments que je souhaite poster
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token") //je récupère la clé présent dans le local storage
            }
          })
          .then(response => {
             // console.log(response);
              document. location. href="http://localhost:8080/posts"; //si tout est ok je recharge la page et j'affiche ensuite mon message
          })
          .catch(error => console.log(error));
      }  else {
        console.log("oops !");
      }
    },
  onFileChanged (event) { //me permet de charger un fichier (une image) au click
    this.dataPost.selectedFile = event.target.files[0];
    //console.log(this.dataPost.selectedFile)
  },
  DelePost (id, userIdOrder) { //'jenvoie l'id du post  selectionné ainsi que l'id de la personne qui a créé le message
    if (
        window.confirm("Voulez-vous vraiment supprimer le post?")
      )
    axios
          .delete("http://localhost:3000/posts/"+id,{data:{userIdOrder}, //je récupère les éléments que je souhaite poster
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token") //je récupère la clé présent dans le local storage
            },
        })
        .then(() => {
          window.location.reload();
        })
        .catch(error => console.log(error));
},
  }
};
</script>