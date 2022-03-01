  <!--Script => Javascript-->
<script>
export default {
    name: "Header",
}
</script>

  <!--Template => HTML-->
<template>
    <header>
        <nav>
            <div>
                <img src="../assets/logo.png"> 
                <h1>Groupomania, réseau social d'entreprise</h1>
            </div>
            <div id="liens">
                <router-link to="/Login">Se connecter</router-link>
                <router-link to="/Signup">S'inscrire</router-link>
            </div>
        </nav>
    </header>
</template>

  <!--Styles => CSS-->

  <style scoped lang="scss">

header{
    padding: 30px;
    background-color: #2469ad;
}

nav {
    a{
        font-size: 30px;
        color:#FFFFFF ;
        text-decoration: none;
        margin: 0 20px;
        &:hover {
            color:#4061db ;
            border-bottom: 5px black solid;
        }
    }
div:first-child{
        display: flex;
        align-items: center;
    }
}
h1{
    font-size: 35px; 
    color:#0715de;
}

#lien {
    text-align: right;
}


.router-link-exact-active{
    border-bottom: 3px #12294d solid;
}



  </style>