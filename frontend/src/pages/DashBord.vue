<template>
  <fragment>
    <NavBar />
    <div class="dashadmin">
      <AdminDashbord />
    </div>
    <Footer />
  </fragment>
</template>

<script>
import AdminDashbord from "../components/AdminDashbord.vue";

import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "DashBord",
  components: { AdminDashbord, NavBar, Footer },
};
</script>
