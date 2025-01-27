<template>
  <div style="margin:20vw;">
    <div v-for="(recipe, index) in recipes" :key="index">{{ recipe.description }}</div>
  </div>
</template>

<script lang="ts" setup>
  const recipes = await $fetch("/api/recipes");
</script>

<style>

</style>
