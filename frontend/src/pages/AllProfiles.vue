<template>
  <main>
    <Disconect />
    <div v-for="member in users" :key="member.id" class="user">
      <div class="user_info">
        <router-link :to="{ name: 'UserProfile', params: { id: member.id } }">
        </router-link>

        <div>
          <div class="info">
            <h2>{{ member.username }}</h2>
            <i v-if="member.sex === 'femme'" class="fas fa-venus"></i>
            <i v-else class="fas fa-mars"></i>
          </div>

          <div class="info">
            <p v-if="member.isAdmin === 1" class="role">Administrateur</p>
            <p v-else class="role">utilisateur courant</p>

            <p>{{ member.email }}</p>
          </div>
        </div>
      </div>

      <router-link :to="{ name: 'Parametre', params: { id: member.id } }"
        ><SubmitButton class="btn-custom" value="Supprimer"
      /></router-link>
    </div>
  </main>
</template>

<script>
import Disconect from "@/components/Disconect";
import axios from "axios";
export default {
  data() {
    return {
      isAdmin: "",
      sex: "",
      userId: "",
      users: "",
      member: [],
    };
  },
  components: {
    Disconect,
  },

  mounted() {
    axios
      .get("http://localhost:3000/all", {
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
  },

};
</script>
