<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'nuxt/app';
import { isAuthenticated, setAuthenticationStatus } from '@/composables/useAuth';
import axios from 'axios';

const router = useRouter();

// Variable pour contrôler la visibilité de la barre de navigation
const isNavVisible = ref(true);

// Variable réactive pour stocker l'utilisateur
const userId = ref<string | null>(null);

// Fonction pour récupérer la session utilisateur
const getSession = async () => {
  try {
    const response = await axios.get('/api/auth/session');
    if (response.data && response.data.userId) {
      userId.value = response.data.userId;
      console.log('ID utilisateur récupéré :', userId.value);
    } else {
      console.warn('Aucune session utilisateur trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la session :', error);
  }
};

const logout = async () => {
  try {
    await axios.post('/api/auth/logout');
    setAuthenticationStatus(false);
    userId.value = null;
    router.push('/login');
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  }
};

const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value;
};

// Surveiller `isAuthenticated` et charger les données utilisateur uniquement si l'utilisateur est connecté
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    getSession();
  } else {
    userId.value = null;
  }
});
</script>

<template>
  <!-- Barre de navigation, visible uniquement si 'isNavVisible' est true -->
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
        <a href="/search">
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

    <!-- Afficher les informations utilisateur uniquement si connecté -->
    <li v-if="isAuthenticated">
      <p>Utilisateur : {{ userId ? userId : 'ID non trouvé' }}</p>
      <button @click="logout">Se déconnecter</button>
    </li>
  </nav>

  <!-- Affiche uniquement l'image pour réactiver la navigation -->
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
