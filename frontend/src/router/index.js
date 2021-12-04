import vue from "vue";
import vueRouter from "vue-router";
import login from "../views/login.vue";
import signup from "../views/signup.vue";
import activity from "../views/activity.vue";
import post from "../views/editPost.vue";
import comment from "../views/editComment.vue";
import allUser from "../views/allUser.vue";
import user from "../views/user.vue";
import param from "../views/param.vue";

vue.use(vueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Login,
  },
  {
    path: "/login",
    name: "Login",
    component: login,
  },
  {
    path: "/Signup",
    name: "Signup",
    component: signup,
  },
  {
    path: "/activity",
    name: "activity",
    component: activity,
  },
  {
    path: "/post/:id",
    name: "post",
    component: post,
  },
  {
    path: "/comment/:id",
    name: "comment",
    component: comment,
  },
  {
    path: "/user",
    name: "allUser",
    component: allUser,
  },
  {
    path: "/user/:id",
    name: "user",
    component: user,
  },
  {
    path: "/parametre/:id",
    name: "parametre",
    component: param,
  },
];

const router = new vueRouter({
  routes,
  mode: "history",
});

export default router;
