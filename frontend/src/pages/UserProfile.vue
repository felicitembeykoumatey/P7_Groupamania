<template>
     <main>
     <h1>SE CONNECTER</h1>
    <!--Informations d'utilisateur--> 
        <aside>

         <!--Est-ce Administrateur ou simple utilisateur? -->
            <section class="description_user">
               <h2> {{ user.username }} </h2><br>
               <p v-if="posts.isAdmin==true" ><span> Profil administrateur :</span> {{ user.isAdmin }} <br></p>
             <!-- le profil administrateur ne s'affiche que si la personne connectée est administrateur -->
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
             <p> <button v-on:click="SupProfile" type="submit" class="btn-deletecount">Supprimer le compte</button> </p>
       </aside>
 </main>
   </template>

   <script>
   import axios from "axios";
   import Footer from '@/components/Footer.vue';
 export default {
      name: 'userProfile',
      components: Footer,
      data(){
           return{
     user:[]
           }
      }

 }
   </script>