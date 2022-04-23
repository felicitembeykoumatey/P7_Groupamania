<template>
  <main id="sendPost">
    <div class="BoutonDisconect">
      <Disconect />
    </div>

    <p>
     Welcome {{ member.username }}!
      <router-link class="redirection-profil" to="/profil"
        ><span class="hide">aaaa</span>

        <p>Mon profil</p>
        <i class="fa-regular fa-user"></i
      ></router-link>
    </p>
    <p v-if="member.isAdmin == true">  <router-link class="redirection-profil" to="/dashbord"
        ><span class="hide">aaaa</span>

        <p>Tableau de bord</p>
        <i class="fa fa-users" aria-hidden="true"></i
      ></router-link></p>
    <br />
    <form @submit.prevent="sendPost">
    <div id="content">


      <label for="content"><span class="news">Quoi de neuf?</span></label
      ><br />
      <textarea
        id="content"
        placeholder="Exprimez-vous?"
        v-model="dataPost.content"
      ></textarea>
    </div>
    <div id="preview" v-if="preview">
      <img :src="preview" :alt="preview" class="image" />
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

      <input  value="Enregistrer" class="btn-publier" type="submit"/>
       
      
    </div>
    </form>
    <p>{{ errMsg }}</p>

    <h2>{{ log("user courant ", userId) }}</h2>
    <div class="container">
      <div class="test">
        <h1>Fil d'actualité</h1>
        <div id="container_post">
          <ul v-for="item in posts" :key="item.id">
            <p v-if="item.images"><img :src="item.images" alt="..." /></p>

            <!--suppresion publication-->
            <p v-if="member.id == item.userId || item.user.isAdmin == true">
              <button v-on:click.prevent="deletePost(item.id, item.userId)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </p>
            <div class="contenu">{{ item.content }} <br /></div>
            <i
              >Publié par <strong>{{ item.user.username }}</strong> le
              {{ item.date.split("T")[0] }} à {{ item.date.slice(11, 16)
              }}<br /><br
            /></i>

            <div class="displayPost_item_like">
              <!-- <h2>{{ log("item.userId", item.userId) }}</h2>-->
              <!--  <Likes v-bind:item="item" />-->
              <Likes :postId="item.id" :userId="member.id" />
            </div>
               <form @submit.prevent="createComment(item.id)">
            <textarea
              id="comment"
              placeholder="Insérer votre commentaire"
              v-model="dataComment.content"
            ></textarea>

            <input type="submit" value="Commenter"/>
          
               </form>

               
            <div id="containe2">
              <div id="example-2">
                <h2>{{ log("item ", item) }}</h2>

                <ul
                  v-for="commentaire in item.comments"
                  :key="commentaire.id"
                  class="commentaire_conteneur"
                >
                  <h2>{{ log("item.content ", commentaire.content) }}</h2>
                  <div class="contenu">{{ commentaire.content }} <br /></div>

                  <i>
                    Commenté par
                    <strong>{{ commentaire.user.username }}</strong> le

                    {{ commentaire.myDate.split("T")[0] }} à
                    {{ commentaire.myDate.slice(11, 16) }}<br /><br />
                  </i>
                  <p
                    v-if="
                      member.id == commentaire.userId ||
                      commentaire.user.isAdmin == true
                    "
                    class="poubelle"
                  >
                    <button v-on:click.prevent="DeleteComment(commentaire.id)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </p>
                </ul>
              </div>
            </div>
              
          </ul>
        </div>
      </div>
    </div>

    <router-view />
  </main>

</template>
<!--Javascript-->

<script>

import Disconect from "@/components/Disconect.vue"; //Importation de la fonction déconexion

//import Comments from "../components/Comments.vue";
import Likes from "../components/Likes.vue";
// eslint-disable-next-line no-unused-vars
import router from "../router";
import axios from "axios"; // importation dépendance axios pour envoyer et recupérer les données.
// eslint-disable-next-line no-unused-vars
//import formData from "form-data";
export default {
  name: "EditPost",
  components: { Disconect, Likes },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      isAdmin: localStorage.getItem("isAdmin"),
      like: false,
      postLikes: [],
      revele: false,
      showComment: false,
      showCreateComment: false,
      dataPost: {
        content: "",
        preview: null,
        errMsg: null,
        images: "",
      },
      files: "",
      dataComment: {
        content: null,
      },
      member: [], //je récupère les infos de la personnes connectée
      posts: [], //je récupère les posts de la personnes connectée
      comments: [],
      likes: [],
    };
  },
  methods: {
    log(commmentaire, variable) {
      console.log(commmentaire, variable);
    },
    selectFile(event) {
      this.files = this.$refs.file.files[0];
      //
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        //console.log("reader", reader)
        reader.onload = (event) => {
          //  console.log("  reader.onload", reader)
          this.preview = event.target.result;
        };
        //console.log("this.previews",this.previews)
        reader.readAsDataURL(input.files[0]);
      }
    },

    getAllPost(){
        axios
      .get(
        "http://localhost:3000/posts", //je récupère les posts
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"), //je récupère la clé présent dans le local storage
          },
        }
      )
      .then((response) => {
        // window.location.reload();
        this.posts = response.data;
      })
      .catch((error) => console.log(error));



    },
    sendPost() {
      // Objet formData pour notre image
      const formData = new FormData();
      formData.append("content", this.dataPost.content);
      formData.append("files", this.$refs.file.files[0]);
      formData.append("userId", localStorage.getItem("userId"));
      //console.log("fffe", formData.get("userId"));
      axios
        .post("http://localhost:3000/posts", formData, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then(() => {
this.getAllPost();
          //router.push({ path: "posts" });
          //window.location.reload();
        })
        .catch((error) => console.log("Erreur", error));
      /* on emit le toggle-Create pour cacher ce composant tout en effaçant les inputs */
      this.$emit("toggle-Create");
      this.content = "";
      this.files = "";
      this.preview = "";
    },
    //supprimer publication//
    deletePost(id) {
      axios
        .delete("http://localhost:3000/posts/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
            this.getAllPost();
          //window.location.reload();
          //this.displayPost();
        })
        .catch((error) => console.log("Erreur", error));
    },
    // Créer et afficher  un nouveau commentaire //
    createComment(id) {
      const formData = new FormData();
      formData.append("content", this.dataComment.content);
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("postId", id);
      axios
        .post("http://localhost:3000/comments", formData, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.getAllPost();
         // router.push({ path: "posts" });
         // window.location.reload();
        })
        .catch((error) => console.log("Erreur", error));
    },
    // Permet de supprimer un commentaire
    DeleteComment(commentId) {
      //gerer commentaire proprietaire des l'user
      axios
        .delete("http://localhost:3000/comments/" + commentId, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then(() => {
             this.getAllPost();
         // window.location.reload();
        })
        .catch((error) => console.log("Erreur", error));
    },
  },
  mounted() {
    this.getAllPost();
    axios
      .get("http://localhost:3000/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      .then((response) => {
        console.log("response", response);
        this.member = response.data;
        console.log("member :", this.member);
      })
      .catch((error) => console.log(error));
    console.log("this.member:", this.member);
  
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
  padding: 10px 2px 10px 2px;
  width: calc(100% - 1rem);
  border-radius: 15px;
}
img {
  display: flex;
  justify-content: center;
  height: 40%;
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
}
.news {
  font-weight: bold;
  color: #c33906;
}
.fa-user {
  font-weight: bold;
  color: #c33906;
}
#preview {
  overflow: hidden;
  max-width: 20%;
}
#btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
  color:red;
}
.container_post {
  color: rgb(8, 8, 8);
  background-color: rgb(100, 207, 240);
  border-radius: 30px 30px 30px 30px;
}
.commentaire_conteneur {
  color: rgb(8, 8, 8);
  background-color: rgb(240, 154, 100);
  border-radius: 30px 30px 30px 30px;
}

/*Média queries*/
/*Mobile*/
@media screen and (min-width: 375px) {
  .img-logo {
    width: 48%;
  }
  #sendPost {
    max-width: 85%;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 40px;
  }
}
/*desktop*/
@media screen and (min-width: 992px) {
}
@media screen and (min-width: 1440px) {
  .img-logo {
    width: 25%;
  }
}
</style>
