<template>
  <nav class="navbar navbar-light" style="background-color: #4781ed">
    <div class="container-fluid header-global">
      <img
        src="../assets/icon-left-font-monochrome-black.svg"
        alt=" logo groupomania"
        class="d-inline-block align-text-top"
      />
    </div>
  </nav>
</template>

<script>
export default {
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

.header-global {
  position: relative;
  box-shadow: 2px 3px 7px;
  z-index: auto;
  margin: 0;
  display: flex;
  flex-direction: column;
}
</style>
