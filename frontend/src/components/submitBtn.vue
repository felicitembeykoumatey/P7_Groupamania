<script>
export default {
  name: "SubmitButton",
};
</script>

<template>
  <input class="btn" v-on="$listeners" type="button" value="" />
</template>

<style scoped lang="scss">
.btn {
  padding: 3px;
  height: 80px;
  font-size: 28px;
  color: #ffffff;
  background-color: #102545;
  border-radius: 37px;
  border: none;
  &:hover {
    background-color: #24559e;
  }
}
@media screen and (min-width: 1024px) {
  .btn {
    font-size: 25px;
  }
}
</style>
