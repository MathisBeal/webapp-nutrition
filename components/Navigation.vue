<template>
  <nav v-if="isNavVisible">
    <img
      alt="Settings Button"
      class="settings-button"
      src="/assets/icons/icon_list-white.png"
      @click="toggleNav"
    />
    <ul>
      <li>
        <a href="/">
          <img
            alt="Home Icon"
            class="nav-icon"
            src="/assets/icons/icon_home.svg"
          />
        </a>
      </li>
      <li>
        <a href="/search">
          <img
            alt="Search Icon"
            class="nva-icon"
            src="/assets/icons/icon_white_search.svg"
          />
        </a>
      </li>
      <li>
        <a href="/stats">
          <img
            alt="Stats Icon"
            class="nva-icon"
            src="/assets/icons/icon_stats.png"
          />
        </a>
      </li>
    </ul>

    <div v-if="isAuthenticated">
      <p>Utilisateur : {{ userId ? userId : 'ID non trouvé' }}</p>
      <button @click="logoutRedirection">Se déconnecter</button>
    </div>
  </nav>

  <img
    v-else
    alt="Settings Button"
    class="settings-button-hidden"
    src="/assets/icons/icon_list.png"
    @click="toggleNav"
  />
</template>

<script lang="ts" setup>
import {getSession, isAuthenticated, logout, userId} from '@/composables/useAuth';

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
    await getSession();
  } else {
    userId.value = null;
  }
});
</script>

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
