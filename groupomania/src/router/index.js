import Vue from 'vue'
import VueRouter from 'vue-router';
import Signup from '../views/Signup.vue';
import Login from  '../views/Login.vue';


Vue.use(VueRouter)
const routes = [
    { 
    path:'/Login',
    name: Login,
    component: Login
  },
  {
    path:'/Signup',
    name: Signup,
    component: Signup
    
  },

];

// Déclaration de notre router

const router = new VueRouter ({ 
  routes
  })
export default router