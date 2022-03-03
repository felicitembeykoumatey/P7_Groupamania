<template>
  <v-app>
    <v-content>
      <v-main>
        <HeaderPage></HeaderPage>
         <CartePost></CartePost>
        <FooterPage></FooterPage>
      </v-main>
    </v-content>
  </v-app>
</template>

<script>
import HeaderPage from './components/HeaderPage.vue'
import FooterPage from './components/FooterPage.vue'
import CartePost from './components/CartePost.vue'
export default{
  name:'app',
  components: {
    'HeaderPage' : HeaderPage,
    'FooterPage': FooterPage,
    'CartePost':CartePost
  },
}

</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<!-- <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div> -->