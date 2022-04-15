<template>
  <main>
    <Disconect />
    <div v-for="member in users" :key="member.id" class="user">
      <div class="user_info">
        <router-link :to="{ name: 'User', params: { id: member.id } }">
        </router-link>

        <div>
          <div class="info">
            <h2>{{ member.username }}</h2>
            <i v-if="member.sex === 'F'" class="fas fa-venus"></i>
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
export default {
  data() {
    return {
      isAdmin: "",
      sex: "",
      userId: "",
      users: "",
    };
  },
  components: {
    Disconect,
  },
};
</script>
