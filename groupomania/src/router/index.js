import { createRouter, createWebHistory} from 'vue-router';
import Signup from '../views/Signup.vue';
import Login from  '../views/Login.vue';
const routes = [
  {
    name: Signup,
    path:'/Signup',
    component: Signup
    
  },
  {
    name: Login,
    path:'/Login',
    component: Login
  }
];

// Déclaration de notre router

const router = createRouter({history: createWebHistory(), routes,
  })
export default router