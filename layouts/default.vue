<script lang="ts" setup>
const appConfig = useAppConfig()
const device = ref(appConfig.theme.device)
</script>

<template>
  <!--Navigation entre les menus-->
  <Navigation />

  <!-- Contenu principal -->
  <main>
    <slot />
  </main>

  <!-- Footer (disponible sur ordinateur) -->
  <Footer v-if="device !== 'mobile'" />
</template>

<style>

</style>
