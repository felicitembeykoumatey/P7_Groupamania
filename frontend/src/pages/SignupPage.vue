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
};
</script>
