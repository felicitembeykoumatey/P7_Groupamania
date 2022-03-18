import { createRouter, createWebHistory} from 'vue-router';
import Home from "./components/Home.vue";
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import EditPost from './pages/EditPost.vue';
import EditComment from './pages/EditComment.vue';
import UserProfile from './pages/UserProfile.vue';
const routes =[
     {path:'/home',component : Home}, 
    {path:'/login',component : Login}, 
    {path:'/signup', component: Signup},
     {path:'/post', component: EditPost},
     {path:'/comment', component: EditComment},
     {path:'/userProfile', component: UserProfile},
];
const router = createRouter ({

    history: createWebHistory(),
    routes,
});

export default router;