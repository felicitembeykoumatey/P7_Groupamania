<template>
  <router-link class="redirection-home" to="/home">
    <p>
      <button @click="disconect" type="submit" class="btn-disconect">
        <span class="hide">aaaa</span><i class="fas fa-power-off"></i>
      </button>
    </p>
  </router-link>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Disconect",
  methods: {
    disconect() {
      localStorage.clear();
      document.location.href = "http://localhost:8080";
    },
  },
};
</script>

<!--Css-->

<style>
.hide {
  display: none;
}
</style>
