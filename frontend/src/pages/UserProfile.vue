<template>
<header>
  <i class="fas fa-arrow-left fa-2x"></i>
     <main>

     <h1>Mon profil</h1>
    <!--Informations d'utilisateur--> 
       
 <div class="BoutonDisconect"> <Disconect/> </div>
        
            <section class="description_user">
               <h2> {{ user.username }} </h2><br>
             <h2> {{user.email }}</h2><br>
             <!--Symbole genre masculin/feminin-->
               <i v-if="user.sex === 'f'" class="fas fa-venus"></i>
                <i v-else class="fas fa-mars"></i>
           </section>
      
            <section class="biography">
                 <h2> Biographie</h2>
                  <textarea v-if="user.biography" class=" biography_user" {{ user.biography }}></textarea>
                  <p v-else class="biography_user">Aucune biographie</p>
            </section>
            <br>
            
             <button v-on:click="deleteProfile" type="submit" class="btn-deletecount"><i class="fa-solid fa-trash-can"></i></button>
      <Footer/>   
 </main>
 </header>
   </template>

   <script>
   import axios from "axios";
      import Disconect from "@/components/Disconect";
   import Footer from '@/components/Footer.vue';
 export default {
      name: 'userProfile',
      components: {Disconect, Footer},
      data(){
           return{
     user: [] ,
     username :"",
     email:""
      }

      },  mounted() { 
      axios
        .get("http://localhost:3000/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        
        .then(response => {
          this.posts = response.data
          
        })
        .catch(error => console.log(error));
        },
    methods:{
       deleteProfile() { 
      if (
        window.confirm("Etes-vous sure de vouloir supprimer votre compte?")
      )
      axios
        .delete("http://localhost:3000/auth/delete", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
     
        .then(() => {
          localStorage.clear();
          document. location. href="http://localhost:8080/signup";
        })
        }
}   
};

   </script>