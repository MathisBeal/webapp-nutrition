<script lang="ts" setup>
import {computed} from 'vue';

// Define props for the component
const props = defineProps({
  aliment_data: {
    type: Object,
    required: true,
  },
});

// Extract data from `recipe_data`
// const recipe = computed(() => props.recipe_data.recipe_info || {});
// const ingredients = computed(() => props.recipe_data.ingredients || []);
const aliment = computed(() => props.aliment_data || {});

// Extract the recipe steps
// const rawSteps = recipe.value.etapes || ''; // Assuming `etapes` is a string
// const steps = computed(() =>
//   rawSteps
//     .split(/\d+\.\s/) // Match numbers followed by a period and space
//     .filter((step: string) => step.trim() !== '') // Remove empty strings
//     .map((step: string) => step.trim()) // Trim any extra spaces
// );

// let img: Blob;
// let url: string;
// let imageFetched: boolean = true;
// try {
//   console.log(recipe.value.images);
//   img = await $fetch(recipe.value.images);
//   url = URL.createObjectURL(img);
// } catch (e) {
//   console.error('Fetching image error: Address may point to nothing or a not image element\n', e);
//   imageFetched = false;
// }


</script>

<template>
  <div class="container">
    <h1 class="aliment_name">{{ aliment?.nom || 'Aliment' }}</h1>
    <img class="aliment_img" alt="" src="assets/img/default_ingredient.jpg">
    <div class="recipe_text">
      <p class="nutri_title">Valeurs nutritionnelles pour {{ aliment.nom }}</p>
      <table>
        <thead>
        <tr>
          <th>Élement</th>
          <th>Valeurs</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>Quantité</th>
          <th>{{aliment.quantite_base}} {{aliment.unite}}</th>
        </tr>
        <tr>
          <th>kCalories</th>
          <th>{{aliment.calories}}</th>
        </tr>
        <tr>
          <th>Glucides</th>
          <th>{{aliment.glucides}} g</th>
        </tr>
        <tr>
          <th>Lipides</th>
          <th>{{aliment.lipides}} g</th>
        </tr>
        <tr>
          <th>Protéines</th>
          <th>{{aliment.proteines}} g</th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 60vw;
  min-height: 100vh;
  margin: 0 auto;
  background: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.aliment_name {
  text-align: center;
  margin: 0 0 0.5em 0;
  padding: 0.5em 0 0 0;
}

.nutri_title {
  font-size: 1.2em;
}

.recipe_text {
  margin: 1.5em 3% 0 3%;
}

.aliment_img {
  margin: auto;
  align-self: flex-end;
  max-width: 25vw;
  max-height: 25vw;
  object-fit: cover;
  border-radius: 1vw;
}

table {
  margin: auto;
  border-collapse: collapse;
  border: 2px solid rgb(112, 112, 112);
  font-size: 1em;
}

thead th {
  font-weight: bold;
  background: rgba(204, 204, 204, 0.5);
}

tbody th {
  font-weight: normal;
}

th {
  border-collapse: collapse;
  border: 1px solid rgb(112, 112, 112);
  padding: 0.2em 0.2em 0.3em 0.3em;
  width: 12vw;
  min-width: fit-content;
}
</style>
