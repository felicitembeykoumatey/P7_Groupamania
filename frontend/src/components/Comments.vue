<template>
    <!-- pour créer un nouveau commentaire -->
    <form @submit.prevent="createComment" v-show="!editComment">
        <input name="comment" placeholder="Publiez un commentaire" v-model="newComment" class="text">                           
        <input type="submit" value="Je commente!">
    </form>
    <p>{{errMsg}}</p>
    <!-- la section commentaire (s'il y en a) -->
    <div id="commentsContainer" v-show="comments.length > 0 ">
        <div :key="comment.id" v-for="comment in comments" class="comment">
            <div class="header">
                <div class="profileContainer">
                        <img :src="'http://localhost:3000/images/' + comment.User.profile" :alt="comment.User.profile" class="profile">>    
                </div>
                <div class="commentUsername">
                    <h5>{{comment.User.firstname}} {{comment.User.lastname}}</h5>     
                </div>
                <div v-if="auth(comment.User.id)" class="optionsBtn">
                    <button v-if="editComment != comment.id" @click="toggleComment(comment.id)"><i class="far fa-edit modify"></i>modifier</button>
                    <button v-if="editComment == comment.id" @click="toggleComment(comment.id)"><i class="fas fa-arrow-left"></i>annuler</button>
                    <button @click="deleteComment(comment.id)"><i class="far fa-trash-alt delete"></i>supprimer</button>    
                </div>               
            </div>                       
            <p v-show="!editComment" class="commentText">{{comment.text}}</p>
            <!-- pour modifier le commentaire -->
            <form v-if="editComment == comment.id" @submit.prevent="modifyComment(comment.id)">
                <input name="updateComment" ref="modify" :value="comment.text" class="text">                           
                <input type="submit" value="Je modifie!" class="btn">
            </form>                          
        </div>        
    </div>
</template>