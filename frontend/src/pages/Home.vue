<template>
  <main class="justify-content-center">
    <fragment>
      <NavBar />
    </fragment>
    <h1 class="b-5 px-10 pt-3">
      Bienvenu(e) sur le social network de Groupomania !
    </h1>
    <div class="row py-4 mt-2">
      <div class="col-md-4">
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
            <img
              :src="preview"
              :alt="preview"
              class="image"
              style=" width=
            100%; height=200px"
            />
          </div>

          <div class="mb-3 d-grid gap-2">
            <input type="submit" value="Publier" class="btn btn-primary" />
          </div>
        </form>
      </div>

      <div class="col-md-6 mx-auto">
        <section
          id="profil_admin"
          class="shadow-sm shadow-lg p-3 mb-5 bg-white rounded col-12 col-md-6 col-lg-4"
        >
          <br />
          <h2>Bonjour {{ member.username }}!</h2>
          <img src="../assets/avatar.webp" alt=" avatar" style="width: 150px" />

          <section v-if="member.isAdmin == true">
            <h3>Admistrateur</h3>
            <router-link class="redirection-profil" to="/dashbord">
              <h4>Tableau de bord</h4>
              <i class="fa fa-users m" aria-hidden="true"></i
            ></router-link>
          </section>
        </section>
        <div
          class="card"
          v-for="item in posts"
          :key="item.id"
          style="width: 38rem; margin-bottom: 20px"
        >
          <img
            :src="item.images"
            v-if="item.images"
            style="width: 100%; height: 100px"
            class="card-img-top"
            alt=""
          />
          <div class="card-body">
            <p class="card-text">{{ item.content }}</p>
            <p>
              Publié par <strong>{{ item.user.username }}</strong> le
              {{ item.date.split("T")[0] }} à {{ item.date.slice(11, 16) }}
            </p>
            <div class="d-grid gap-2 d-md-block">
              <p v-if="member.id == item.userId || item.user.isAdmin == true">
                <button class="btn btn-primary pl-5 pr-5" type="button">
                  <Likes :postId="item.id" :userId="member.id" />
                </button>

                <button
                  class="btn btn-primary pl-5 pr-5"
                  v-on:click.prevent="deletePost(item.id, item.userId)"
                  type="button"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--
    <h1 class="b-5 px-10 pt-3">
      Bienvenu(e) sur le social network de Groupomania !
    </h1>
    <section
      id="profil_admin"
      class="shadow-sm shadow-lg p-3 mb-5 bg-white rounded col-12 col-md-6 col-lg-4"
    >
      <br />
      <h2>Bonjour {{ member.username }}!</h2>
      <img src="../assets/avatar.webp" alt=" avatar" style="width: 150px" />

      <section v-if="member.isAdmin == true">
        <h3>Admistrateur</h3>
        <router-link class="redirection-profil" to="/dashbord">
          <h4>Tableau de bord</h4>
          <i class="fa fa-users m" aria-hidden="true"></i
        ></router-link>
      </section>
    </section>
    <br />

    <form @submit.prevent="sendPost">
      <div class="mb-3 col-12 col-md-6 col-lg-4" id="content">
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
        <input type="submit" value="Publier" class="btn btn-primary" />
      </div>
    </form>
    <h2>{{ errMsg }}</h2>

    <section>
      <h3 class="h3 text-center">Fil d'actualité</h3>

      <div
        class="container d-flex justify-content-center"
        v-for="item in posts"
        :key="item.id"
      >
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4">
            <article class="card" style="width: 38rem">
              <img
                :src="item.images"
                v-if="item.images"
                class="img-fluid card-img-top"
                alt="..."
              />

              <figcaption class="mg-md text-center figure-caption">
                <blockquote class="card-body bg-info text-center filter">
                  <p class="card-text">{{ item.content }}</p>

                  <p>
                    Publié le {{ item.date.split("T")[0] }} à
                    {{ item.date.slice(11, 16) }} par
                    <strong>{{ item.user.username }}</strong>
                  </p>
                </blockquote>

                <div class="card-body">
                
                
                  <Likes :postId="item.id" :userId="member.id" />
                
                  <p
                    v-if="member.id == item.userId || item.user.isAdmin == true"
                  >
                    <button
                      v-on:click.prevent="deletePost(item.id, item.userId)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </p>
                </div>
              </figcaption>
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
                  <button class="btn btn-primary" type="button">Valider</button>
                </div>
              </form>
              <div>
                <div>
                  <ul
                    v-for="commentaire in item.comments"
                    :key="commentaire.id"
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
                        class="deleteIcon"
                        v-on:click.prevent="DeleteComment(commentaire.id)"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </p>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <router-view />-->

    <Footer />
  </main>
</template>

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
      // Objet formData pour notre image^
      console.log("ffffffffffffff");
      const formData = new FormData();
      formData.append("content", this.dataPost.content);
      formData.append("files", this.$refs.file.files[0]);
      formData.append("userId", localStorage.getItem("userId"));
      console.log("fdgfhfh");
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
.filter {
  display: flex;
  padding-right: 2.5%;
  align-items: center;
  height: 59px;
  border: 2px #d9d9d9 solid;
  border-radius: 10px;
  font-size: 1.4em;
}

.deleteIcon {
  border: 2px #d9d9d9 solid;
  border-radius: 10px;
}
</style>
