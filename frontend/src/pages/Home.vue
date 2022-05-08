<template>
  <main>
    <fragment>
      <NavBar />
    </fragment>

    <div class="shadow-sm shadow-lg p-3 mb-5 bg-white rounded">
      <h1 class="b-5 px-10 pt-3">
        Bienvenu(e) sur le social network de Groupomania !
      </h1>
      <br />
      <h2>
        <img src="../assets/avatar.webp" alt=" avatar" style="width: 180px" />
        Bonjour {{ member.username }}!
      </h2>

      <section v-if="member.isAdmin == true">
        <h3>Admistrateur</h3>
        <router-link class="redirection-profil" to="/dashbord">
          <h4>Tableau de bord</h4>
          <i class="fa fa-users m" aria-hidden="true"></i
        ></router-link>
      </section>
    </div>
    <br />

    <form @submit.prevent="sendPost">
      <div class="mb-3" id="content">
        <label for="FormTextarea1" class="form-label">Exprimez-vous !</label>
        <textarea
          rows="3"
          id="floatingTextarea"
          class="form-control"
          placeholder=" Quoi de neuf?"
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

        <a href="#" value="Enregistrer" class="btn btn-primary">Publier</a>
      </div>
    </form>
    <p>{{ errMsg }}</p>

    <h2>{{ log("user courant ", userId) }}</h2>
    <div class="container">
      <div class="test">
        <h3 class="actuality">Fil d'actualité</h3>

        <div id="container_post" class="card-text">
          <ul class="" v-for="item in posts" :key="item.id">
            <div class="figure card" style="width: 18rem">
              <p v-if="item.images">
                <img
                  :src="item.images"
                  class="img-fluid card-img-top"
                  alt="..."
                />
              </p>

              <figcaption class="card-body">
                {{ item.content }} <br />

                <i
                  >Publié par <strong>{{ item.user.username }}</strong> le
                  {{ item.date.split("T")[0] }} à {{ item.date.slice(11, 16)
                  }}<br /><br
                /></i>
              </figcaption>

              <div class="card-body">
                <!-- <h2>{{ log("item.userId", item.userId) }}</h2>-->
                <!--  <Likes v-bind:item="item" />-->
                <Likes :postId="item.id" :userId="member.id" />
                <!--suppresion publication-->
                <p v-if="member.id == item.userId || item.user.isAdmin == true">
                  <button v-on:click.prevent="deletePost(item.id, item.userId)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </p>
              </div>

              <form @submit.prevent="createComment(item.id)">
                <textarea
                  id="comment"
                  class="list-group-item mt-5"
                  placeholder="Insérer votre commentaire"
                  v-model="dataComment.content"
                ></textarea>

                <input
                  type="submit"
                  value="Commenter"
                  class="btn btn-primary"
                />
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
                      <button
                        v-on:click.prevent="DeleteComment(commentaire.id)"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </p>
                  </ul>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <router-view />

    <Footer />
  </main>
</template>
<!--Javascript-->

<script>
//import Disconect from "@/components/Disconect.vue"; //Importation de la fonction déconexion
import NavBar from "@/components/NavBar.vue"; //Importation de la fonction déconexion
import Footer from "@/components/Footer.vue"; //Importation de la fonction déconexion
//import Comments from "../components/Comments.vue";
import Likes from "../components/Likes.vue";
// eslint-disable-next-line no-unused-vars
//import router from "../router";
import axios from "axios"; // importation dépendance axios pour envoyer et recupérer les données.
// eslint-disable-next-line no-unused-vars
//import formData from "form-data";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { NavBar, Footer, Likes },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      isAdmin: localStorage.getItem("isAdmin"),
      like: false,

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
    getAllPost() {
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
textarea.form-control {
  min-height: calc(8.5em + 0.75rem + 2px);
}
.actuality {
  position: relative;
  box-shadow: 2px 3px 7px;
  z-index: auto;
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
  color: red;
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
