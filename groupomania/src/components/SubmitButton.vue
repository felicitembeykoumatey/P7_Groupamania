<!--Template => HTML-->
<template>
	<input class="btn" v-on="$listeners" type="button" value="">
</template>

<!--Template => HTML-->
  
  <style scoped lang="css">
  .btn {
  background-color: #04AA6D;
    width: 100%;
  color: #FFFF;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;

} 

  </style>

<script>
export default {
  name: 'SubmitButton'
}
</script>