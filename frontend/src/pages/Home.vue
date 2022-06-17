<template>
  <div class="justify-content-center">
    <fragment>
      <NavBar />
    </fragment>
    <div class="row py-4 mt-2">
      <div class="col-md-4">
        <div class="sticky-top">
          <p class="welcome">
            Bienvenu(e) sur le social network de Groupomania !
          </p>
          <div v-if="errMsg" class="alert alert-danger mtb-2" role="alert">
            {{ errMsg }}
          </div>
          <form @submit.prevent="sendPost">
            <div class="mb-3">
              <textarea
                id="floatingTextarea"
                class="form-control"
                placeholder=" Quoi de neuf?"
                v-model="dataPost.content"
              ></textarea>
            </div>

            <div class="mb-3">
              <input
                id="files"
                ref="file"
                name="file"
                type="file"
                @change="selectFile"
                accept=".jpg, .jpeg, .png"
                class="form-control"
              />
            </div>

            <div id="preview" class="mb-3" v-if="preview">
              <img :src="preview" :alt="preview" class="preview" />
            </div>

            <div class="mb-3 d-grid gap-2">
              <input type="submit" value="Publier" class="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>

      <div class="col-md-6 mx-auto">
        <section class="card">
          <p class="bienvenu">
            Bonjour <span v-if="member.sex == 'homme'">Monsieur</span>
            <span v-else>Madame</span> {{ member.username }}!
          </p>
        </section>
        <h2>{{ errMsg }}</h2>

        <h3 class="h3 text-center shadow-sm p-3 mb-5 bg-body rounded">
          Fil d'actualité
        </h3>

        <div class="card mb-5" v-for="item in posts" :key="item.id">
          <img
            :src="item.images"
            v-if="item.images"
            class="card-img-top img"
            alt=""
          />
          <div class="card-body card text-dark bg-info">
            <p class="card-text">{{ item.content }}</p>
            <p>
              Publié par <strong>{{ item.user.username }}</strong> le
              {{ item.date.split("T")[0] }} à {{ item.date.slice(11, 16) }}
            </p>
            <div class="row d-flex justify-content-between">
              <div class="col-4">
                <Likes :postId="item.id" :userId="member.id" />
              </div>

              <div class="col-4 d-grid gab-2">
                <button
                  class="btn btn-secondary btn-sm"
                  v-on:click.prevent="flagcommentaire()"
                >
                  <i class="fa-solid fa-comment"></i> &nbsp;&nbsp;&nbsp;
                  {{ item.comments.length }}
                </button>
              </div>
              <div class="col-4 d-grid gab-2">
                <button
                  v-if="member.id == item.userId || member.isAdmin == true"
                  class="btn btn-danger btn-sm"
                  v-on:click.prevent="deletePost(item.id, item.userId)"
                  type="button"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <div class="row" v-show="flag == true">
              <div class="col-12 mb-3">
                <form @submit.prevent="createComment(item.id)">
                  <div class="form-floating">
                    <textarea
                      id="comment"
                      class="form-control filter list-group-item mt-5"
                      v-model="dataComment.content"
                    ></textarea>
                    <label for="text-center">Réagissez !</label>
                  </div>

                  <div class="d-grid gap-2">
                    <input
                      type="submit"
                      value="Commenter"
                      class="btn btn-primary"
                    />
                  </div>
                </form>
              </div>
              <!--fin form-->

              <div class="col-12">
                <div
                  class="card-body text-dark bg-light list-group-item"
                  v-for="commentaire in item.comments"
                  :key="commentaire.id"
                >
                  <!--<h2>{{ log("item.content ", commentaire.content) }}</h2>-->
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
                      commentaire.user.isAdmin == false
                    "
                  >
                    <button
                      class="btn btn-sm btn-danger"
                      v-on:click.prevent="
                        DeleteComment(commentaire.id, commentaire.userId)
                      "
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
//import Disconect from "@/components/Disconect.vue"; //Importation de la fonction déconexion
import NavBar from "@/components/NavBar.vue"; // barre de navigateur
import Footer from "@/components/Footer.vue"; //Footer
import Likes from "../components/Likes.vue";
import axios from "axios"; // importation dépendance axios pour envoyer et recupérer les données.
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  props: {
    postId: Number,
  },
  components: { NavBar, Footer, Likes },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      isAdmin: localStorage.getItem("isAdmin"),
      like: false,
      dataPost: {
        content: "",
        preview: "",

        images: "",
      },
      errMsg: "",
      files: "",
      dataComment: {
        content: "",
      },
      member: [], //je récupère les infos de la personnes connectée
      posts: [],
      comments: [],
      nbcomments: [],
      likes: [],
      flag: false,
    };
  },
  methods: {
    log(commmentaire, variable) {
      console.log(commmentaire, variable);
    },
    flagcommentaire() {
      this.flag = true;
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
          "http://localhost:3000/allposts", //je récupère les posts
          {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"), //je récupère la clé présent dans le local storage
            },
          }
        )
        .then((response) => {
          console.log("tttt", response.data);
          this.posts = response.data;
        })
        .catch((error) => console.log(error));
    },
    sendPost() {
      const formData = new FormData();
      formData.append("content", this.dataPost.content);
      formData.append("files", this.$refs.file.files[0]);
      formData.append("userId", localStorage.getItem("userId"));
      if (!this.dataPost.content || !this.$refs.file.files[0]) {
        this.errMsg = "Les champs sont obligatoires";
      } else {
        axios
          .post("http://localhost:3000/posts", formData, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
          })
          .then(() => {
            this.getAllPost();
            this.errMsg = null;
            this.dataPost.content = null;
            this.$refs.file.value = null;
            this.preview = null;
          })
          .catch((error) => console.log("Erreur", error));
        /* on emit le toggle-Create pour cacher ce composant tout en effaçant les inputs */
        this.$emit("toggle-Create");
      }
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
          this.dataComment.content = null;
          this.getAllPost();
        })
        .catch((error) => console.log("Erreur", error));
    },
    // Permet de supprimer un commentaire
    DeleteComment(commentId) {
      axios
        .delete("http://localhost:3000/comments/" + commentId, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.getAllPost();
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
        this.member = response.data;
      })
      .catch((error) => console.log(error));
    /* axios
      .get("http://localhost:3000/countComments" + this.postId, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("comments : ", response.data);
        this.nbcomments.length = response.data;
      })
      .catch((error) => console.log(error));*/
  },
};
</script>
<style scoped>
.img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.preview {
  width: 100px;
}
</style>
