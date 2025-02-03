<script lang="ts" setup>
import {computed} from 'vue';
import lazyLoad from "~/utils/lazyLoadImg.ts";

// Define props for the component
const props = defineProps({
  recipeData: {
    type: Object,
    required: true,
  },
});

// Extract data from `recipe_data`
const recipe = computed(() => props.recipeData.recipe_info || {});
const ingredients = computed(() => props.recipeData.ingredients || []);

// Extract the recipe steps
const rawSteps = recipe.value.etapes || ''; // Assuming `etapes` is a string
const steps = computed(() =>
  rawSteps
    .split(/\d+\.\s/) // Match numbers followed by a period and space
    .filter((step: string) => step.trim() !== '') // Remove empty strings
    .map((step: string) => step.trim()) // Trim any extra spaces
);

const imgSrc = lazyLoad("/img/placeholders/recipe.jpg", recipe.value.images);

</script>

<template>
  <div class="container">
    <!-- Recipe Title -->
    <h1 class="recipe_name">{{ recipe?.description || 'Recipe' }}</h1>

    <img :alt="'Image of ' + recipe?.description" :src="imgSrc" class="recipe_image">

    <div class="recipe_text">
      <!-- Ingredients List -->
      <div class="ingredients">
        <h2>Ingrédients :</h2>
        <RecipeIngredient v-for="(ingredient, index) in ingredients" :key="index" :ingredient="ingredient"/>
      </div>

      <!-- Recipe Steps -->
      <div class="steps">
        <h2>Étapes :</h2>
        <ol>
          <li v-for="(step, index) in steps" :key="index" class="step">{{ step }}</li>
        </ol>
      </div>
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

.recipe_name {
  text-align: center;
  margin: 0 0 0.5em 0;
  padding: 0.5em 0 0 0;
}

.recipe_image {
  width: 100%;
  max-height: 27vh;
  object-fit: cover;
}

.recipe_text {
  margin: 1.5em 3% 0 3%;
}

.steps ol {
  padding-left: 1.5em;
}

.step {
  margin-top: 0.5em;
}

h2,
h3 {
  color: #333;
}

p {
  margin: 0.2em 0;
}

div {
  text-align: left;
}
</style>
