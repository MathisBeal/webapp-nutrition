<script lang="ts" setup>
import {getSession, isAuthenticated, logout, userId} from '@/composables/useAuth';
import {ChartColumnBig, House, Menu, Search} from 'lucide-vue-next'
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
    userId.value = null;
  }
});

function goTo(address: string) {
  router.push(address);
}

</script>

<template>
  <nav v-if="isNavVisible">
    <Menu :size="48" class="settings-button" color="#ffffff" @click="toggleNav"/>
    <ul>
      <li @click="goTo('/home')">
        <House :size="48" color="#ffffff"/>
      </li>
      <li @click="goTo('/search')">
        <Search :size="48" color="#ffffff"/>
      </li>
      <li @click="goTo('/stats')">
        <ChartColumnBig :size="48" color="#ffffff"/>
      </li>
    </ul>

    <div v-if="isAuthenticated">
      <p>Utilisateur : {{ userId ? userId : 'ID non trouvé' }}</p>
      <button @click="logoutRedirection">Se déconnecter</button>
    </div>
  </nav>

  <Menu v-else :size="48" class="settings-button-hidden" color="#000000" @click="toggleNav"/>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 145px;
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
  margin-top: 50px;
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

.bouton {
  padding-bottom: 20px;
}

button:hover {
  background-color: #d32f2f;
}

li:last-child {
  margin-top: auto;
  margin-bottom: 50px;
}

.settings-button,
.settings-button-hidden {
  cursor: pointer;
  width: 50px;
  height: auto;
  margin-bottom: 20px;
}

.settings-button-hidden {
  position: fixed;
  top: 20px;
  left: 20px;
}
</style>
