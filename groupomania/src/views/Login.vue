<!-- HTML -->
<template>
 <main class="card">
 <h1 class="title-login"> Connexion à votre espace </h1>
<form>
<!--Username-->
<label for="username">Nom d'utilisateur</label>
<input type="text" name="username" id="user_name" placeholder="Entrez votre nom d'utilisateur" required v-model="username">

<!--Email-->
<label for="email">Email</label>
<input type="email" name="email" id="email" placeholder="Entrez votre adresse Email" autofocus required v-model="email">

<!--Password-->
<label for="password">Mot-de-passe</label>
<input type="password" id="password" name="passeword" placeholder="Entrez votre mot de passe" required v-model="password">


<!-- Bouton connexion -->
<button type="submit" class="btn" @click="userLoginSend" value="Se connecter"/>
                 
</form>
 <span class="link_sign"><p>Pas de compte ? <router-link to="/signup">Inscrivez-nous !</router-link></p></span>

</main>
</template>

<!-- CSS-->
<style scoped lang="css">
/*Corps de la page*/
html {
  min-width: auto;
}
body{
  background-color: #66b4ff ;
  font-family: "Roboto", sans-serif;
}
.title-login{
  color:#000;
  margin: 10px 12px 15px 10px; 
  padding: 10px 12px 12px 10px; 
}

input[type=text], input[type=password] {
 display: inline-block;
 width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
} 

button, .btn {
  background-color: #04AA6D;
    width: 100%;
  color: #FFFF;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;

} 

button:hover {
  opacity: 0.8;
} 


/*médias quéries*/
/*Mobile*/

@media screen and (min-width:375px) {

  form {
  width: 90%;
}
/*Pieds de la page*/

.copyright{

  width: 98%;
 
}
}
/*Tablette*/
@media screen and (min-width: 768px) {
  form {
  width: 60%;
}
.signup-box{
  height: 620px;
margin: auto;
background-color: #ffff;
border-radius: 3px;
}
}

/*Desktops*/
@media screen and (min-width: 992px) {

  form {
  width: 45%;
}
}

@media screen and (min-width:1440px) {

  form {
  width: 40%;
}
}

</style>

<!-- Javascript -->
<script>

export default {
    name: 'Login',
    data() {
        return {
            inputLogin: {
                username:"",
                email: "",
                password: ""
            }
        }
    },

methods:{
    login(){
const loginDatas ={
    "username":this.inputLogin.username,
    "email": this.inputLogin.email,
    "password": this.inputLogin.passeword
}
let url = "http://localhost:3000/login"
let options = {
     method: "POST",
      body: JSON.stringify(loginDatas),
        headers: {
     'Content-Type': 'application/json'
}
 }

     fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    if (res.userId && res.token) {
                        localStorage.setItem("userId", res.userId)
                        localStorage.setItem("token", res.token)
                        localStorage.setItem("isAdmin", res.isAdmin);
                       
                        this.$router.push("message");
                        alert(" 🙋‍♂️ Bienvenue sur Groupomania Connect ! Connectez-vous dès à présent ! 🙋‍♀️");
                    } else {
                        alert(" 🚨 Mot de passe incorrect ! ");
                    }
                })
                .catch(error => console.log(error))
}

}
    
}
  
 </script>