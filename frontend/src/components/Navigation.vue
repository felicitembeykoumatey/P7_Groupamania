<template>
  <nav>
    <button>
    
    </button>
    <router-link class="navbar-brand" to="/">
      <img class="w-50" src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" />
    </router-link>

    <div id="navbar">
      <ul >
        <li  v-if="user.token!==null">
          <router-link class="nav-link" to="/">Accueil</router-link>
        </li>
        <li  v-if="user.token==null">
          <router-link class="nav-link" to="/signup">S'inscrire</router-link>
        </li>
        <li  v-if="user.token==null">
          <router-link class="nav-link" to="/login">Se connecter</router-link>
        </li>
        <li v-if="user.token!==null">
          <router-link class="nav-link" to="/user">
            <i class="user-icon fas fa-user"></i>
          </router-link>
        </li>
        <li  v-if="user.token!==null">
          <button type="button" class="btn btn-danger" @click="logout">Deconnexion</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

