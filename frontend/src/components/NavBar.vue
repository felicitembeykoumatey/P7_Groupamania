<template>
  <nav class="navbar navbar-expand-lg bg-primary text-white">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/icon-left-font-monochrome-black.svg"
          alt=" logo groupomania"
          width="200"
        />
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">
          <i class="fas fa-bars" style="color: #fff; font-size: 28px"></i
        ></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" to="/posts">
              <i class="fa fa-home"></i>&nbsp;&nbsp; Accueil
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profil">
              <i class="fa fa-user"></i>&nbsp;&nbsp;Profil
            </router-link>
          </li>
          <li class="nav-item">
            <a @click="disconect" class="nav-link" href="#">
              <i class="fas fa-power-off"></i> Se déconnecter
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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

<style>

.navbar-toggler {
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 0.25rem;
  transition: box-shadow 0.15s ease-in-out;
}

.nav-link {
  font-size: 1.2rem;
  font-weight: 800;
  text-align: center;
  color: white;
}
.active {
  color: black;
}

@media (min-width: 992px) {
  .navbar-expand-lg .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
    justify-content: flex-end;
  }
}
</style>
