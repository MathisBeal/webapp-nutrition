<template>
  <div>
    <div class="recipe" v-for="(recipe, index) in recipes" :key="recipe.ID_plat" @click="goToRecipe(recipe.ID_plat)">
      <p>{{ recipe.description }}</p>
    </div>
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
  margin: 5em 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe {
  width: 40%;
  padding: 0.4em;
  margin: 0.4em auto;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
  background: #f3f3f3;
  font-size: 1.5em;
  align-items: center;
  align-content: center;
}

.recipe:hover {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  background: #e6e6e6;
}

p {
  margin: 0;
}
</style>
