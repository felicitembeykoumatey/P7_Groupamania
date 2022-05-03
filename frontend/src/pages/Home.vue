<template>
  <fragment>
    <NavBar />
    <div class="container">
      <Signup />
    </div>
    <Footer />
  </fragment>
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
