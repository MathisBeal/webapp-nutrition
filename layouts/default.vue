<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'nuxt/app'
const appConfig = useAppConfig()
const device = ref(appConfig.theme.device)

// Redirection vers la page de login par défaut
// Ce composant ne redirige que si l'utilisateur est sur "/".
const router = useRouter()
onMounted(() => {
  if (router.currentRoute.value.path === '/') {
    router.push('/login') // Redirige vers la page de connexion
  }
})
</script>

<template>
  <!-- Navigation entre les menus -->
  <Navigation />

  <!-- Contenu principal -->
  <main>
    <slot />
  </main>

  <!-- Footer (disponible sur ordinateur uniquement) -->
  <Footer v-if="device !== 'mobile'" />
</template>

<style>
</style>
