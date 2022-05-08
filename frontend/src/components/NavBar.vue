<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/icon-left-font-monochrome-black.svg"
          alt=" logo groupomania"
          style="width: 250px"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="ml-2 navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Accueil</a>
          </li>

          <li class="nav-item">
            <router-link class="redirection-profil nav-link" to="/profil">
              Mon profil
            </router-link>
          </li>

          <button @click="disconect" class="btn btn-outline-success">
            <i class="fas fa-power-off"></i> Déconnexion
          </button>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import router from "../router";

// eslint-disable-next-line vue/multi-word-component-names

export default {
  name: "NavBar",
  // eslint-disable-next-line vue/multi-word-component-names

  methods: {
    disconect() {
      localStorage.clear();
      router.push({ path: "login" });
    },
  },
};
</script>
