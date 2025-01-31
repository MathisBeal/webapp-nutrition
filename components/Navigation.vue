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

    <div class="fix-bottom" v-if="isAuthenticated">
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

.bouton {
  padding-bottom: 2vh;
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
