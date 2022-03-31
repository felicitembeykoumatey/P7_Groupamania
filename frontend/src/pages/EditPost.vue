<template>
  <main id="sendPost">
    <div class="BoutonDisconect">
      <Disconect />
    </div>

    <p>
      Bienvenu(e) 
      <router-link class="redirection-profil" to="/profil"
        ><span class="hide">aaaa</span>
        <p>Mon profil</p></router-link
      >
    </p>

    <form @submit.prevent="sendPost">
      <div id="content">
        <label for="content"><span>Quoi de neuf?</span></label
        ><br />
        <textarea
          id="content"
          placeholder="Exprimez-vous?"
          v-model="dataPost.content"
        ></textarea>
      </div>
      <div id="preview" v-if="preview">
        <img :src="preview" :alt="preview" class="image"/>
      </div>

      <div id="btns">
        <input
          id="files"
          ref="file"
          name="file"
          type="file"
          @change="selectFile"
          accept=".jpg, .jpeg, .png"
        />

        <input type="submit" value="Publier" />
      </div>
      <p>{{ errMsg }}</p>
    </form>


<div class="container2">
      <div class="test"><h1>Fil d'actualité</h1>
      <ul id="example-1">
     <li v-for="post in posts" :key="post.id"> 
      <span>{{ post.content }}<br></span>
    
      <i>Publié par <strong>{{post.User.username }}</strong> le {{post.createdAt.split('T')[0]}} à {{post.createdAt.slice(11,16)}}<br><br></i>
      <div class="contenu"> {{ post.content }} <br></div>
  
  
      <p v-if="member.id==post.userId || member.isAdmin">  <button @click.prevent="DeleMessage(post.id, post.userId)" id="btn-sup" type="submit" class="btn btn-primary"><span class="cacher">aaaa</span><i class="fas fa-trash-alt"></i></button> </p>    
    
  </li>
  </ul>
  </div>
  </div>
  
  </main>
 
</template>
<!--Javascript-->
 
<script>
import Disconect from "@/components/Disconect.vue"; //Importation de la fonction déconexion
//import Footer from "@/components/Footer.vue";
//import Comments from "../components/Comments.vue";
// import Likes from "../components/Likes.vue";
// eslint-disable-next-line no-unused-vars
import router from "../router";
import axios from "axios"; // importation dépendance axios pour envoyer et recupérer les données.
// eslint-disable-next-line no-unused-vars
import formData from "form-data";

export default {
  name: "EditPost",
  components: { Disconect},
  

  data() {
    return {

      dataPost: {
        content: "",
    
     
        preview: null,
        errMsg: null,
      
  
      }, 
        files: "",

      member: [], //je récupère les infos de la personnes connectée
       
       posts: [], //je récupère les posts de la personnes connectée
    };
  },

      
  methods: {
    selectFile(event) {
      this.files = this.$refs.file.files[0];
      //console.log("this.files", this.files)
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        //console.log("reader", reader)
        reader.onload = (event) => {
          //  console.log("  reader.onload", reader)
          this.preview = event.target.result;
         
        };
 console.log("this.previews",this.previews)
        reader.readAsDataURL(input.files[0]);
      }
    },

    sendPost() {
      // LE contenu est obligatoire!
      if (!this.content) {
        this.errMsg =
          "Vous devez remplir obligatoirement le champs !";
        return
      }
     // Objet formData pour notre image
      const formData = new FormData()
      formData.append("content", this.dataPost.content)
      formData.append("files", this.file.name)
     formData.append("userId", localStorage.setItem("userId"))
      //console.log("this.dataPost",this.dataPost);
      //console.log("this.dataPost.content",this.dataPost.content);
      //console.log("this.file.name",this.file.name)

      axios.post("http://localhost:3000/posts", formData, {
          headers: {
            
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          
        })
           .then(response => {
              console.log(response);
              document. location. href="http://localhost:8080/post"; //si tout est ok je recharge la page et j'affiche ensuite mon message
          })
        //.then((res) => this.$emit("add-Post", res.data))

                //.then(res => this.$emit('sendPost', res.data))
                .catch(error => console.log(error))
     
      /* on emit le toggle-Create pour cacher ce composant tout en effaçant les inputs */
      this.$emit("toggle-Create");
      this.content = "";
      this.files = "";
      this.preview = "";
      document.querySelector("form").reset();
    },
  },

  
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
#sendPost {
    max-width: 60%;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 40px;
}

textarea {
    height: 15px;
    padding: 10px 2px 10px 2px ;
    width: calc(100% - 1rem);
    border-radius: 15px;
}

img {
  display: flex; 
  justify-content: center;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

#preview {
    overflow: hidden;
    max-width: 20%;
}

#btns{
display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    border-top: 1px solid hsla(0, 0%, 0%, 0.5);
    padding-top: 2rem;
}
</style>
