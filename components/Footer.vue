<script setup lang="ts">
import icon_home from "assets/icons/icon_home.png";
import icon_search from "assets/icons/icon_search.png";
import icon_stats from "assets/icons/icon_stats.png";
import icon_user from "assets/icons/icon_user.png";
</script>

<template>
  <footer>
    <router-link to="/home"><img :src="icon_home" alt="Page d'accueil"></router-link>
    <router-link to="/home"><img :src="icon_search" alt="Recherche"></router-link>
    <router-link to="/home"><img :src="icon_stats" alt="Statistiques"></router-link>
    <router-link to="/home"><img :src="icon_user" alt="Utilisateur"></router-link>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  background: #cccccc;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 7px;
  border-top: 1px solid rgba(96, 96, 96, 0.9);
  box-shadow: 0 -2px 7px rgba(96, 96, 96, 0.7);
}

a {
  margin: auto;
}

a:hover {
  text-decoration: none;
  border-radius: 25%;
  box-shadow: 0 0 5px rgba(40,40,40,0.71);
}
</style>
