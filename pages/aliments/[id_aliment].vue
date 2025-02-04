<template>
  <div>
    <AlimentDetail v-if="aliment_data" :alimentData="aliment_data" :linkedRecipes="linked_recipes"/>
    <div v-else-if="error">
      Could not fetch aliment from database.
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router';
import type {AlimentData, LinkedRecipe} from "~/types/Aliments.ts";

const params = useRoute().params;
const aliment_data = ref<AlimentData>();
const linked_recipes = ref<LinkedRecipe[]>([]);
const error = ref(false);

onMounted(async () => {
  // Fetch the recipe data from the API
  if (params && params.id_aliment) {
    try {
      aliment_data.value = await $fetch<AlimentData>(`/api/aliments/${params.id_aliment}`);
    } catch (err) {
      console.error("Error fetching aliment:", err);
      error.value = true; // Set error to true if fetch fails
    }
    try {
      linked_recipes.value = (await $fetch(`/api/aliments/linked/${params.id_aliment}`)).map(recipe => ({
        ID_plat: recipe.ID_plat,
        description: recipe.Plats.description,
        images: recipe.Plats.images,
        duree: recipe.Plats.duree,
        nom_categorie: recipe.Plats.Plats_Categories.nom,
      }));
    } catch (err) {
      console.error("Error fetching linked recipes:", err);
      linked_recipes.value = [];
    }
  } else {
    console.error("No recipe ID found in route params.");
    error.value = true;
  }
});
</script>
