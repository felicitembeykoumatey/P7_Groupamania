<template>
  <button @click="disconect" class="btn btn-outline-success">
    <i class="fas fa-power-off"></i> Déconnexion
  </button>
</template>

<script>
import router from "../router";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Disconect",
  methods: {
    disconect() {
      localStorage.clear();
      router.push({ path: "login" });
    },
  },
};
</script>

<!--Css-->
