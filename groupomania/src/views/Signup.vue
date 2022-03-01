<template>
<main>
<h1> S'inscrire </h1>


<form>
            <!-- Username -->
            <label for="username">Nom d'utilisateur</label>
            <input type="text" id="username" name="username" placeholder="Votre nom d'utilisateur" autofocus required v-model="username">

            <!-- Email -->
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Votre adresse Email" required v-model="email">

            <!-- Password One -->
            <label for="password-one">Mot de passe</label>
            <input type="password" id="password-one" name="password_one" placeholder="Votre mot de passe" required v-model="passwordone">

            <!-- Password Two -->
            <label for="password-two">Confirmation du mot de passe</label>
            <input type="password" id="password-two" name="password_two" placeholder="Confirmez votre mot de passe" required v-model="passwordtwo">

            <!-- Sex -->
            <label for="genre">Genre</label><br/>
            <div class="genre-sex">
                <div>
                    <input type="radio" id="genre" name="genre_man" value="homme" required @click="user_is_a_man"/>
                    <label for="genre-sex">Homme</label>
                </div>
                <div>
                    <input type="radio" id="genre" name="genre_female" value="femme" required @click="user_is_a_woman"/>
                    <label for="genre-sex">Femme</label>
                </div>
            </div>

            <!-- Button -->
            <SubmitButton class="btn-custom" @click="userSignup" value="S'inscrire"/>
        </form>
    </main>







</template>