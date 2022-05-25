<template>
  <div>
 
    <button v-if="!liked" @click.prevent="likePost(postId)" class="btn">
      <i class="far fa-thumbs-up likeBtn like"></i>
      <h2>{{ log("Nombre de like template : ", likes.length) }}</h2>
      {{ likes }}
   
    </button>
   
  </div>
</template>

<script>
import axios from "axios"; // importation dépendance axios pour envoyer et recupérer les données.

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Likes",
  props: {
    postId: Number,
    userId: Number,
  },
  data() {
    return {
      likes: [],
      dislikes: [],
    };
  },

  methods: {
    likePost(postId) {
      const formData = new FormData();
      formData.append("likes", true);
      formData.append("userId", this.userId);
      formData.append("postId", postId);
      axios
        .post("http://localhost:3000/posts/like", formData, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then((response) => {
         // console.log("likes : ", response.data);
          this.likes = response.data;
         // console.log("nombre de like methode : ",   this.likes );
        
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    const formData = new FormData();
    formData.append("postId", this.postId);

    axios
      .get("http://localhost:3000/likes/" + this.postId, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("likes : ", response.data);

        this.likes = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>
