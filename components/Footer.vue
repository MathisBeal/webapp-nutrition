<template>
  <footer>
    <router-link to="/"><img :src="icon_home" alt="Page d'accueil"></router-link>
    <router-link to="/"><img :src="icon_search" alt="Recherche"></router-link>
    <router-link to="/"><img :src="icon_stats" alt="Statistiques"></router-link>
    <router-link to="/"><img :src="icon_user" alt="Utilisateur"></router-link>
  </footer>
</template>

<script lang="ts" setup>
import icon_home from "assets/icons/icon_home.svg";
import icon_search from "assets/icons/icon_white_search.svg";
import icon_stats from "assets/icons/icon_stats.png";
import icon_user from "assets/icons/icon_user.png";
</script>

<style scoped>
footer {
  display: flex;
  background: #cccccc;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 1vh;
  border-top: 0.1vh solid rgba(96, 96, 96, 0.9);
  box-shadow: 0 -0.2vh 0.7vh rgba(96, 96, 96, 0.7);
}

a {
  margin: auto;
}

a:hover {
  text-decoration: none;
  border-radius: 25%;
  box-shadow: 0 0 0.5vh rgba(40, 40, 40, 0.71);
}
</style>
