import { createRouter, createWebHistory } from "vue-router";
//import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Signup from "./components/Signup.vue";
import Home from "./pages/Home.vue";
import UserProfile from "./pages/UserProfile.vue";

import AllProfiles from "./pages/AllProfiles.vue";
import DashBord from "./pages/DashBoard.vue";
import UpdateProfilUserByAdmin from "./pages/UpdateProfilUserByAdmin.vue";
import UpdatePasswordByAdmin from "./pages/UpdatePasswordByAdmin.vue";
import UpdateProfilByUser from "./pages/UpdateProfilByUser.vue";
import UpdatePasswordByUser from "./pages/UpdatePasswordByUser.vue";
const routes = [
  // Chemin vers le portail pour s'inscrire ou se connecter, avant d'entrer dans Home
  {
    name: "Login",
    component: Login,
    path: "/",
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
  },


  {
    name: "Signup",
    component: Signup,
    path: "/Signup",
  },
 
  // Chemin vers la page actualités(journal)
  {
    name: "Home",
    component: Home,
    path: "/posts",
  },

  // Chemin vers la page profile utilisateur
  {
    name: "UserProfile",
    component: UserProfile,
    path: "/profil",
  },

  // Chemin vers la page Affiche tous les profiles utilisateurs
  {
    name: "AllProfiles",
    component: AllProfiles,
    path: "/profiles",
  },

  // Chemin vers la page Tableau de bord
  {
    name: "DashBoard",
    component: DashBord,
    path: "/dashboard",
  },

  // Chemin de l'admin vers la page modification mot de passe des utilisateurs
  {
    name: "UpdatePasswordByAdmin",
    component: UpdatePasswordByAdmin,
    path: "/UpdatePasswordByAdmin",
  },
  // Chemin vers la page modification profil par Administrateur
  {
    name: "UpdateProfilUserByAdmin",
    component: UpdateProfilUserByAdmin,
    path: "/UpdateProfilUserByAdmin",
  },

  // Chemin  vers la page modification de son mot de passe
  {
    name: "UpdatePasswordByUser",
    component: UpdatePasswordByUser,
    path: "/UpdatePasswordByUser",
  },
  // Chemin vers la page modification du profil d'utilisateur par l'utilisateur
  {
    name: "UpdateProfilByUser",
    component: UpdateProfilByUser,
    path: "/UpdateProfilByUser",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
