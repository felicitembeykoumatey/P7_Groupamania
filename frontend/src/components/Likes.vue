<template>
  <div class="likes-dislikes">
    <button v-if="!liked" @click="likePost(postId)" class="btn">
      <i class="far fa-thumbs-up likeBtn like"></i>
      {{ likes.length }}
    </button>
    <button v-else @click="unlikePost(postId)" class="btn">
      <i class="far fa-thumbs-up likeBtn liked"></i>
      {{ likes.length }}
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
      liked: null,
    };
  },
  methods: {
    likePost(postId) {
      const formData = new FormData();
      formData.append("like", true);
      formData.append("userId", this.userId);
      formData.append("postId", postId);

      axios
        .post("http://localhost:3000/posts/like", formData, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => console.log("Erreur", error));
    },
  },
  async created() {
    this.likes = await this.fetchLikes(this.postId);
  },
};
</script>

<style scoped>
button {
  background: none;
  border-style: none;
  outline: none;
  width: 40%;
}
p {
  margin: 1rem 0 1rem 0;
}
.liked {
  color: white;
  background-color: #3174e4;
  border: 1px solid #3174e4;
  border-radius: 50%;
  padding: 0.5rem;
}
.like {
  color: #3174e4;
  background-color: white;
  border: 1px solid #3174e4;
  border-radius: 50%;
  padding: 0.5rem;
}
i {
  margin-right: 4px;
}
</style>
