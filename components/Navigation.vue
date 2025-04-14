<template>
  <!-- Bouton pour afficher la nav quand elle est cachée -->
  <Menu v-if="!isNavVisible" :size="48" class="settings-button-hidden" color="#333333" @click="toggleNav"/>

  <!-- Menu principal -->
  <nav v-if="isAuthenticated && isNavVisible">
    <Menu :size="48" class="settings-button" color="#ffffff" @click="toggleNav"/>
    <ul>
      <li @click="goTo('/')">
        <House :size="48" color="#ffffff"/>
      </li>
      <li @click="goTo('/search')">
        <Search :size="48" color="#ffffff"/>
      </li>
      <li @click="goTo('/alimentation')">
        <a href="/alimentation">
          <Utensils :size="48" class="nav-icon" />
        </a>
      </li>
    </ul>

    <div class="fix-bottom" v-if="isAuthenticated">
      <p>{{ capitalizeFirstLetter(userName) }}</p>
      <button @click="logoutRedirection">Se déconnecter</button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { getSession, isAuthenticated, logout, userName } from '@/composables/useAuth';
import { ChartColumnBig, House, Menu, Search, Utensils } from 'lucide-vue-next'
import { useRouter } from "nuxt/app";
import { ref, onMounted, watch } from "vue";

const router = useRouter();
const isNavVisible = ref(true);

const logoutRedirection = async () => {
  await logout();
  router.push('/login');
};

const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value;
};

const capitalizeFirstLetter = (string: string | null) => {
  if (!string) return 'Prénom introuvable';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

onMounted(async () => {
  await getSession();
});

watch(isAuthenticated, async (newValue) => {
  if (newValue) {
    console.log("Utilisateur connecté, récupération de la session...");
    await getSession();
  } else {
    console.log("Utilisateur déconnecté !");
    userName.value = null;
  }
});

function goTo(address: string) {
  router.push(address);
}
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 10vw;
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
  text-align: center;
  margin-top: 5vh;
}

li {
  margin: 1rem 0;
}

a {
  color: white;
  text-decoration: none;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}

li:last-child {
  margin-top: auto;
  margin-bottom: 5vh;
}

.settings-button {
  cursor: pointer;
  width: 5vw;
  height: auto;
  margin-bottom: 2vh;
}

.settings-button-hidden {
  position: fixed;
  top: 2vh;
  left: 2vw;
  cursor: pointer;
  width: 5vw;
  height: auto;
  /*
  background-color: black;
  */
}

.fix-bottom {
  position: fixed;
  bottom: 0;
  width: 10vw;
  padding: 1rem;
  background-color: #333;
  color: white;
  text-align: center;
}
</style>
