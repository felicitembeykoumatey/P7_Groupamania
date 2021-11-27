<script>
export default {
  name: "header",
};
</script>

<template>
  <header>
    <nav>
      <div>
        <img src="../assets/icon.svg" />
        <p>Groupomania</p>
      </div>
      <div id="lien">
        <router-link to="/Login">Se connecter</router-link>
        <router-link to="/Signup">S'inscrire</router-link>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
p {
  font-size: 30px;
  color: #fd2d01;
}
header {
  background-color: #02145c;
  padding: 40px;
}
nav {
  a {
    font-size: 25px;
    color: white;
    text-decoration: none;
    margin: 0 20px;
    &:hover {
      color: #de505a;
      border-bottom: 5px black solid;
    }
  }
  div:first-child {
    display: flex;
    align-items: center;
  }
}
img {
  width: 50px;
}
#lien {
  text-align: right;
}
.router-link-exact-active {
  border-bottom: 3px #e06e76 solid;
}
</style>
