import { createRouter, createWebHistory} from 'vue-router';
import Home from "./pages/Home.vue";
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import EditPost from './pages/EditPost.vue';
import EditComment from './pages/EditComment.vue';
import UserProfile from './pages/UserProfile.vue';
import Post from './pages/Post.vue';
import AllProfiles from './pages/AllProfiles.vue';

const routes =[
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
         name:'Post',
         component : Post,
        path:'/posts'
    }, 
   
    // Chemin vers la page post
      {
         name:'EditPost',
         component : EditPost,
        path:'/post'
    }, 
    
    // Chemin vers la page commentaire


      {
         name:'EditComment',
         component : EditComment,
        path:'/comment'
    }, 

    // Chemin vers la page profile utilisateur
      {
         name:'UserProfile',
         component : UserProfile,
        path:'/profil'
    }, 

    // Chemin vers tous les profiles utilisateurs
      {
         name:'AllProfiles',
         component : AllProfile,
        path:'/allprofiles'
    }, 
];
const router = createRouter ({

    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
 // console.log(router.beforeEach);
  if (to.meta.requireAuth) {
    if (!TokenService.getToken()) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;