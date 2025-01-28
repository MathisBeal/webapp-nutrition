<template>
  <div>
    <button v-for="(recipe, index) in recipes" :key="recipe.ID_plat" @click="goToRecipe(recipe.ID_plat)">
      {{ recipe.description }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const recipes = await $fetch("/api/recipes");

function goToRecipe(page: number) {
  navigateTo("/recipes/" + page);
}
</script>

<style scoped>
div {
  margin: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  width: fit-content;
  margin: 0.3em auto;
}
</style>
