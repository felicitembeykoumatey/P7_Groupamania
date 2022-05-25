<template>
  <div class="navbar navbar-expand navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand"
        ><img
          src="../assets/icon-left-font-monochrome-black.svg"
          alt=" logo groupomania"
          style="width: 250px"
      /></a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="d-flex justify-content-evenly collapse navbar-collapse"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li class="nav-item pl-5 pr-5">
            <router-link class="nav-link" to="/posts">
              <i class="fa fa-home"></i>&nbsp;&nbsp;ACCUEIL
            </router-link>
          </li>
          <li class="nav-item pl-5 pr-5">
            <router-link class="nav-link" to="/profil">
              <i class="fa fa-user"></i>&nbsp;&nbsp;PROFIL
            </router-link>
          </li>
        </ul>
      </div>
      <div class="d-flex">
        <button @click="disconect" class="btn btn-outline-success">
          <i class="fas fa-power-off"></i> Déconnexion
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  methods: {
    disconect() {
      localStorage.clear();
      router.push({ path: "login" });
    },
  },
};
</script>
