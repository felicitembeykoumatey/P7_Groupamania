<template>
  <div><NavBar /></div>
  <div class="container">
    <div>
      <Signup />

      <div class="container-fluid">
        <img
          src="../assets/intranet-reseau-social-dentreprise.jpg"
          alt=" logo groupomania"
          class="d-inline-block align-text-top"
        />
      </div>
    </div>
  </div>
  <div><Footer /></div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import Signup from "@/components/Signup.vue";
export default {
  components: { NavBar, Signup, Footer },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {},
};
</script>
<!--Css-->
<style scoped>
.link-signup,
.link-login {
  margin: 6px;
}
.title-white {
  color: rgb(255, 255, 255);
}
.container-row {
  display: flex;
  flex-direction: row;
}
</style>
