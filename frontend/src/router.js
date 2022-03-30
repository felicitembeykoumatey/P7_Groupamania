import { createRouter, createWebHistory} from 'vue-router';

import Signup from './pages/Signup.vue';
import Login from './pages/Login.vue';
import Home from './pages/Home.vue';
import EditPost from './pages/EditPost.vue';
import UserProfile from './pages/UserProfile.vue';
<<<<<<< HEAD

=======
import Post from './pages/Post.vue';
import AllProfiles from './pages/AllProfiles.vue';
>>>>>>> main

const routes =[

     // Chemin vers le portail pour s'inscrire ou se connecter, avant d'entrer dans Home
   {
         name:'Home',
         component : Home,
        path:'/'
    }, 

    // Chemin vers la page connexion
    {
         name:'Login',
         component : Login,
        path:'/login'
    },
      // Chemin vers la page d'inscription
      {
         name:'Signup',
         component : Signup,
        path:'/signup'
    }, 
   
    // Chemin vers la page actualités(journal)
      {
         name:'EditPost',
         component : EditPost,
        path:'/posts'
    }, 
   
  
    
    // Chemin vers la page profile utilisateur
      {
         name:'UserProfile',
         component : UserProfile,
        path:'/profil'
    }, 

<<<<<<< HEAD
   
=======
    // Chemin vers tous les profiles utilisateurs
      {
         name:'AllProfiles',
         component : AllProfile,
        path:'/allprofiles'
    }, 
>>>>>>> main
];
const router = createRouter ({

    history: createWebHistory(),
    routes,
})


export default router;