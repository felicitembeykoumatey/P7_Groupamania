<!-- HTML-->
<template>
 <nav id="navbar">
            <router-link to="/message" title="Rédiger un message"><i class="fas fa-pencil-alt"></i></router-link> 
             <router-link to="/list" title="Liste des messages"><i class="fas fa-globe"></i></router-link>
            <router-link to="/account" title="Votre compte"><i class="far fa-address-card"></i></router-link>
            <router-link to="/infos" title="Informations"><i class="fas fa-cog"></i></router-link>
            <router-link to="/" title="Informations"><i @click="deconnect" class="fas fa-door-open" title="Déconnexion"></i></router-link>
        </nav>

</template>

<!-- CSS-->
<style lang="css">
#navbar {
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: fixed;
    margin: auto;
    box-shadow: inset 0px 0px 0px 10px white;
    border: 8px solid #d44c5c;
    border-radius: 30px;
    padding: 15px;
    background-color:#0c2444;
    opacity: 0.95;
    margin-top: 25px;
    margin-left: 25px;
}
#navbar i {
    font-size: 2.5em;
    color: white;
    padding: 0 5px 0 5px;
    margin-left: 5px;
}

/*médias quéries*/

/*Mobile*/
@media screen and (max-width: 450px) {
	#navbar {
        box-shadow: inset 0px 0px 0px 8px white;
        border: 5px solid #d44c5c;
    }
    #navbar i {
        font-size: 2em;
    }
}
/*Tablette*/
@media screen and (max-width: 768px) {
	#navbar {
        height: auto;
        width: 70%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        position: relative;
        margin: auto;
        left: 0;
    }
}
</style>

<!-- Javascript-->


<script>
export default {
    name: "Navigation",
    methods: {
        deconnect() {
            localStorage.clear();
            this.$router.push("/");
        }
    }
}
</script>