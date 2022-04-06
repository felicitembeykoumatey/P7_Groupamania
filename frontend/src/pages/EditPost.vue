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

      <div class="container">
        <div class="test">
          <h1>Fil d'actualité</h1>
          <div id="example-1">
            <ul v-for="item in posts" :key="item.id">
              <p v-if="item.images"><img :src="item.images" alt="..." /></p>

              <div class="contenu">{{ item.content }} <br /></div>
              <i
                                
                >Publié par <strong>{{ item.user.username }}</strong> le
                {{ item.date.split("T")[0] }} à {{ item.date.slice(11, 16)
                }}<br /><br
              /></i>

              <div class="displayPost_item_like">
               <!--  <h2> {{log("item",item)}} </h2>-->
                <Likes v-bind:item="item" />
<!--
                <div>
                  <i
                    @click="displayComment(item.id)"
                    v-on:click="diplayCreateComment(item.id)"
                    class="displayPost_item_like_button far fa-comment-dots"
                    aria-label="Commenter"
                  ></i>
                  <span
                    v-if="item.comments.length > 0"
                    class="displayPost_item_like_count"
                    >{{ item.comments.length }}</span
                  >
                </div> 
-->
                <i
                  v-if="userId == item.userId || isAdmin == 'true'"
                  v-on:click="deletePost(item.id)"
                  class="displayPost_item_option_button far fa-trash-alt"
                  aria-label="Supprimer le message"
                ></i>
              </div>
              <!--
              <div>
                <div v-for="item in comments" :key="item.commentid">
                  <div
                    v-bind:showComment="showComment"
                    v-if="showComment && item.id == comment.postId"
                    class="comment_item"
                  >
                    <div class="comment_item_information">
                      <div class="comment_item_information_user">
                        <h2 class="comment_item_information_user_name">
                          {{ comment.user.username }}
                        </h2>
                      </div>

                     <div>
                        <i>
                          Commenté par
                          <strong>{{ item.user.username }}</strong> le
                          {{ item.date.split("T")[0] }} à
                          {{ item.date.slice(11, 16) }}<br /><br />
                        </i>
                      </div>-->
                      <!--Contenu du commentaire-->
                       <!--
                      <div class="post_item_publication">
                        <p class="post_item_publication_text">
                          {{ comment.content }}
                        </p>
                      </div>-->

                      <!--Suppression commentaire-->
                      <!--
                      <div class="post_item_delete">
                        <i
                          v-if="userId == comment.userId || isAdmin == 'true'"
                          @click="deleteComment(comment.id)"
                          class="post_item_delete_button far fa-trash-alt"
                        ></i>
                      </div>
                    </div>

                    <div
                      :formId="item.id"
                      style="display: none"
                      v-bind:showCreateComment="showCreateComment"
                      class="comment_newComment"
                    >
                      <form
                        @submit.prevent="createComment(item.id)"
                        class="comment_newComment_form"
                      >
                        <textarea
                          v-model="contentComment"
                          class="comment_newComment_form_text"
                          name="comment"
                          id="comment"
                          placeholder="Ecrivez votre commentaire ..."
                          aria-label="Rédiger un nouveau commentaire"
                        />

                        <div>
                          <button
                            class="displayComment_newComment_form_button"
                            aria-label="Publier le commentaire"
                          >
                            <i class="far fa-paper-plane"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>-->
              <textarea
                id="comment"
                placeholder="Insérer votre commentaire"
                v-model="dataComment.content"
              ></textarea>

              <button v-on:click.prevent="createComment(item.id)">
                <i class="fas fa-comment" title="Envoyer"></i>
              </button>
              <div id="containe2">
                <div id="example-2">
                  <ul v-for="item in comments" :key="item.id">
                    <div class="contenu">{{ item.content }} <br /></div>

                    <i>
                      Commenté par <strong>{{ item.user.username }}</strong> le
                      {{ item.date.split("T")[0] }} à
                      {{ item.date.slice(11, 16) }}<br /><br />
                    </i>

                    <p v-if="user.id == comment.userId || user.isAdmin">
                      <button
                        @click.prevent="
                          DeleteComment(comment.id, comment.userId)
                        "
                        id="btn-sup"
                        type="submit"
                        class="btn btn-primary"
                      >
                        <span class="cacher">aaaa</span
                        ><i class="fas fa-trash-alt"></i>
                      </button>
                    </p>
                  </ul>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </form>
    <router-view />
  </main>
</template>
<!--Javascript-->

<script>
import Disconect from "@/components/Disconect.vue"; //Importation de la fonction déconexion
//import Footer from "@/components/Footer.vue";
//import Comments from "../components/Comments.vue";
import Likes from "../components/Likes.vue";
// eslint-disable-next-line no-unused-vars
//import router from "../router";
import axios from "axios"; // importation dépendance axios pour envoyer et recupérer les données.
// eslint-disable-next-line no-unused-vars
import formData from "form-data";

export default {
  name: "EditPost",
  components: { Disconect, Likes },

  data() {

    
    return {
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      isAdmin: localStorage.getItem("isAdmin"),
      like: false,
      postLikes:[],
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
      user: [], //je récupère les infos de la personnes connectée

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
//supprimer publication//

    deletePost(id) {
                const postId = id;
               
                axios.delete('http://localhost:3000/posts/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    this.displayPost();
                })
                .catch(error => {
                    error.response.data
                  
                })
            },
            // Créer et afficher  un nouveau commentaire //
        createComment(id) {

       const formData = new FormData();

      formData.append("content", this.dataComment.content);
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("postId",id);
  //const postId = id;
  //this.showCreateComment == false
  //let form = document.querySelector('div[formId="'+id+'"]')
 //let formId = form.getAttribute('formId');
  /*if(postId == formId && this.showCreateComment == false) {
                    form.style.display = "block";
                    this.showCreateComment = !this.showCreateComment
                } else if(postId == formId && this.showCreateComment == true) {
                    form.style.display = "none";
                    this.showCreateComment = !this.showCreateComment
                }*/
                console.log("formData : ", formData)
        axios
        .post("http://localhost:3000/comments", formData, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => console.log("Erreur", error));
            },

            // Permet de créer un nouveau commentaire
            displayCreateComment(id) {
                const postId = id;
                axios.post('http://localhost:3000/api/comment/' + postId, {
                    content: this.contentComment,
                },{
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()                    
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },
            // Permet d'afficher les commentaires d'un message
            displayComment(id) {
                this.showComment = !this.showComment
                const postId = id;
                
                axios.get('http://localhost:3000/comments/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.comments = response.data;
                })
                .catch(error => {
 error.response.data
                  
                })
            },
// Permet de supprimer un commentaire
            deleteComment(id) {
                const commentId = id;
                axios.delete('http://localhost:3000/comments/' + commentId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            }
    /*  const formData = new FormData();
      console.log("poiuytrtyuiouytrertgyhujk");
      formData.append("content", this.dataComment.content);
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("postId", localStorage.getItem("postId"));

      if (this.dataComment.content !== null)
        axios
          .post("http://localhost:3000/posts", formData, {
            content: this.dataComment.content,
            postId: postId,

            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log("response", response);
            document.location.href = "http://localhost:8080/posts";
          })
          .catch((error) => console.log("Erreur", error));
      this.$emit("toggle-Create");
      this.content = "";

      document.querySelector("div").reset();

      axios
        .get(
          "http://localhost:3000/comments", //je récupère les comments
          {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"), //je récupère la clé présent dans le local storage
            },
          }
        )
        .then((response) => {
          console.log("response", response);
          this.comments = response.data;
          console.log(" this.comments", this.comments);
        })

        .catch((error) => console.log(error));
    },*/
  },

 mounted() {
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
        this.posts = response.data;
      })

      .catch((error) => console.log(error));
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
