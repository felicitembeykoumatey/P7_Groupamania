<template>
    <button v-if="!liked" @click="likePost(postId)">
        <i class="far fa-thumbs-up likeBtn like"></i>
        {{likes.length}}
    </button>
    <button v-else @click="unlikePost(postId)">
        <i class="far fa-thumbs-up likeBtn liked"></i>
        {{likes.length}}
    </button>
</template>