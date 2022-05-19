<template>
  <div>
    <h2>{{ log("aaaaaaaaaaaaaaaaaa ", postId) }}</h2>
    <button v-if="!liked" @click.prevent="likePost(postId)" class="btn">
      <i class="far fa-thumbs-up likeBtn like"></i>
      <h2>{{ log("qaxzcevrbhtnjyki ", likes.length) }}</h2>
      {{ likes.length }}
    </button>
    <!-- <button v-else @click.prevent="unlikePost(postId)" class="btn">
      <i class="far fa-thumbs-o-up likeBtn liked"></i>
      {{ likes.length }}
    </button>-->
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
    log(commmentaire, variable) {
      console.log(commmentaire, variable);
    },
    likePost(postId) {
      console.log("fffffffffffffffff : ");
      console.log("ddddddddddddddddddd : ");
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
          console.log("likes : ", response.data);
          this.likes = response.data;
          // window.location.reload();
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
</style>
