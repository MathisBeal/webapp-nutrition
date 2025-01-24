<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'nuxt/app'
import { isAuthenticated, setAuthenticationStatus } from '@/composables/useAuth'

const { user } = useUserSession()
const router = useRouter()

// Variable pour contrôler la visibilité de la barre de navigation
const isNavVisible = ref(true)

const logout = () => {
  setAuthenticationStatus(false)
  router.push('/login')
}

// Fonction pour masquer ou afficher la barre de navigation
const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value
}
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
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>

    <li class="bouton" v-if="isAuthenticated">
      <p v-if="user" class="user-info">Bienvenue, {{ user.name }} !</p>
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
  padding: 0;
  width: 100%;
  text-align: center;
  margin-top: 50px;
}

li {
  list-style: none;
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

.user-info {
  color: #0055ff;
  font-weight: bold;
}
</style>
