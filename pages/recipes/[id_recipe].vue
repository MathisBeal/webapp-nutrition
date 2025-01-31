<script lang="ts" setup>
import {useRoute} from 'vue-router';

const params = useRoute().params;
const recipe_data = ref(null);
const error = ref(false);

onMounted(async () => {
  if (params && params.id_recipe) {
    try {
      recipe_data.value = await $fetch(`/api/recipes/${params.id_recipe}`);
    } catch (err) {
      console.error("Error fetching recipe:", err);
      error.value = true; // Set error to true if fetch fails
    }
  } else {
    console.error("No recipe ID found in route params.");
    error.value = true;
  }
});
</script>

<template>
  <div>
    <RecipeDetail v-if="recipe_data" :recipeData="recipe_data"/>
    <div v-else-if="error">
      Could not fetch recipe from database.
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
