<template>
  <main id="sendPost">
    <div class="BoutonDisconect">
      <Disconect />
    </div>

    <p>
      Bienvenu(e)
      <router-link class="redirection-profil" to="/profil"
        ><span class="hide">aaaa</span>

        <p>Mon profil</p>
        <i class="fa-regular fa-user"></i
      ></router-link>
    </p>
    <br />
    <form>
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

        <button @click.prevent="sendPost" class="btn-publier" type="submit">
          <i class="fa-solid fa-share-from-square"></i>
        </button>
      </div>
      <p>{{ errMsg }}</p>
    </form>

    <div class="container">
      <div class="test">
        <h1>Fil d'actualité</h1>
        <ul id="example-1">
          <li v-for="post in posts" :key="post.id">
            <span>{{ post.content }}<br /></span>

            <!-- <i>Publié par <strong>{{post.User.username }}</strong> le {{post.createdAt.split('T')[0]}} à {{post.createdAt.slice(11,16)}}<br><br></i>
      <div class="contenu"> {{ post.content }} <br></div>-->

            <p v-if="users.id == post.userId || users.isAdmin">
              <button
                @click.prevent="DelePost(post.id, post.userId)"
                id="btn-sup"
                type="submit"
                class="btn btn-primary"
              >
                <span class="cacher">aaaa</span><i class="fas fa-trash-alt"></i>
              </button>
            </p>
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
//import router from "../router";
import axios from "axios"; // importation dépendance axios pour envoyer et recupérer les données.
// eslint-disable-next-line no-unused-vars
import formData from "form-data";

export default {
  name: "EditPost",
  components: { Disconect },

  data() {
    return {
      dataPost: {
        content: "",
        preview: null,
        errMsg: null,
        images: "",
      },
      files: "",

      users: [], //je récupère les infos de la personnes connectée

      posts: [], //je récupère les posts de la personnes connectée
    };
  },
  mounted() {
    axios
      .get(
        "http://localhost:3000/posts", // récupèrer les messages postés
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"), //récupèrer la clé présent dans le local storage
          },
        }
      )
      .then((response) => {
        //   console.log(response);
        this.posts = response.data;
        //  console.log("this.posts", this.posts);
      })

      .catch((error) => console.log(error));
  },

  methods: {
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

    sendPost() {
      // LE contenu est obligatoire!
      // appeler back-end postsCtlr.createPost
      // console.log("formData", formData)
      /*         if (!this.content) {
        this.errMsg =
          "Vous devez remplir obligatoirement le champs !";
        return
      }*/
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
        .then((response) => {
          console.log("response", response);
          document.location.href = "http://localhost:8080/posts";
        })
        .catch((error) => console.log("Erreur", error));

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
  padding: 10px 2px 10px 2px;
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
