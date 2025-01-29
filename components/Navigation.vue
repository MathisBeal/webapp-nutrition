<script lang="ts" setup>
import { useRouter } from 'nuxt/app';
import { getSession, logout, isAuthenticated, userId } from '@/composables/useAuth';


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

const checkAuthBeforeNavigation = (page: string) => {
  console.log(`Navigation vers ${page}...`);
  console.log(`isAuthenticated:`, isAuthenticated.value);
  if (!isAuthenticated.value) {
    console.warn("Utilisateur déconnecté avant la navigation !");
  } else {
    console.log("Utilisateur toujours connecté.");
  }
};

</script>

<template>
  <nav v-if="isNavVisible">
    <img
      src="/assets/icons/icon_list-white.png"
      alt="Settings Button"
      @click="toggleNav"
      class="settings-button"
    />
    <ul>
      <li>
        <a href="/home">
          <img
            src="/assets/icons/icon_home.svg"
            alt="Home Icon"
            class="nav-icon"
          />
        </a>
      </li>
      <li>
        <a href="/search" @click="checkAuthBeforeNavigation('Search')">
          <img
            src="/assets/icons/icon_white_search.svg"
            alt="Search Icon"
            class="nva-icon"
          />
        </a>
      </li>
      <li>
        <a href="/stats">
          <img
            src="/assets/icons/icon_stats.png"
            alt="Stats Icon"
            class="nva-icon"
          />
        </a>
      </li>
    </ul>

    <li v-if="isAuthenticated">
      <p>Utilisateur : {{ userId ? userId : 'ID non trouvé' }}</p>
      <button @click="logoutRedirection">Se déconnecter</button>
    </li>
  </nav>

  <img
    v-else
    src="/assets/icons/icon_list.png"
    alt="Settings Button"
    @click="toggleNav"
    class="settings-button-hidden"
  />
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
