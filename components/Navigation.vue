<template>
  <nav v-if="isAuthenticated">
    <nav v-if="isNavVisible">
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
        <li @click="goTo('/stats')">
          <ChartColumnBig :size="48" color="#ffffff"/>
        </li>
      </ul>

      <div class="fix-bottom" v-if="isAuthenticated">
        <p>Utilisateur : {{ userName ? userName : 'Prénom introuvable' }}</p>
        <button @click="logoutRedirection">Se déconnecter</button>
      </div>
    </nav>
    <Menu v-else :size="48" class="settings-button-hidden" color="#000000" @click="toggleNav"/>
  </nav>
</template>

<script lang="ts" setup>
import {getSession, isAuthenticated, logout, userName} from '@/composables/useAuth';
import {ChartColumnBig, House, Menu, Search, Utensils} from 'lucide-vue-next'
import {useRouter} from "nuxt/app";

const router = useRouter();
const isNavVisible = ref(true);

const logoutRedirection = async () => {
  await logout();
  router.push('/login');
};

const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value;
};

onMounted(async () => {
  await getSession();
});

// Surveiller changements d'état d'authentification
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

.settings-button,
.settings-button-hidden {
  cursor: pointer;
  width: 5vw;
  height: auto;
  margin-bottom: 2vh;
}

.settings-button-hidden {
  position: fixed;
  top: 2vh;
  left: 2vw;
}

.fix-bottom
{
  position: fixed;
  bottom: 0;
  width: 10vw;
  padding: 1rem;
  background-color: #333;
  color: white;
  text-align: center;
}
</style>
