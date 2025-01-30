<script lang="ts" setup>
import {computed} from 'vue';

// Define props for the component
const props = defineProps({
  recipe_data: {
    type: Object,
    required: true,
  },
});

// Extract data from `recipe_data`
const recipe = computed(() => props.recipe_data.recipe_info || {});
const ingredients = computed(() => props.recipe_data.ingredients || []);

// Extract the recipe steps
const rawSteps = recipe.value.etapes || ''; // Assuming `etapes` is a string
const steps = computed(() =>
  rawSteps
    .split(/\d+\.\s/) // Match numbers followed by a period and space
    .filter((step: string) => step.trim() !== '') // Remove empty strings
    .map((step: string) => step.trim()) // Trim any extra spaces
);

let img: Blob;
let url: string;
let imageFetched: boolean = true;
try {
  // @ts-ignore
  img = await $fetch(recipe.value.images);
  url = URL.createObjectURL(img);
} catch (e) {
  console.error('Fetching image error: Address may point to nothing or a not image element\n', e);
  imageFetched = false;
}


</script>

<template>
  <div class="container">
    <!-- Recipe Title -->
    <h1 class="recipe_name">{{ recipe?.description || 'Recipe' }}</h1>

    <!-- Recipe Image -->
    <!--    <img
          :alt="'Image of ' + recipe?.description"
          class="recipe_image"
          :src="recipe?.images"
        >-->
    <img v-if="imageFetched" :alt="'Image of ' + recipe?.description" class="recipe_image" :src="url">
    <img v-else alt="Default recipe image" class="recipe_image" src="assets/img/plat.png">

    <div class="recipe_text">
      <!-- Ingredients List -->
      <div class="ingredients">
        <h2>Ingrédients</h2>
        <ul>
          <li
            v-for="(ingredient, index) in ingredients"
            :key="index"
            class="ingredient"
          >
            <img
              :alt="'Image of ' + ingredient.Aliments.nom"
              src="assets/img/default_ingredient.jpg"
            />
            <p>
              <strong>{{ ingredient.Aliments.nom }}</strong>:
              {{
                Number.parseInt(ingredient.Aliments.quantite_base) * Number.parseFloat(ingredient.multiplicateur_quantite)
              }} {{ ingredient.Aliments.unite }}
            </p>
          </li>
        </ul>
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

.ingredients ul {
  list-style: none;
  padding: 0;
}

.ingredient {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.ingredient img {
  width: 50px;
  height: 50px;
  margin-right: 1em;
  border-radius: 50%;
  object-fit: cover;
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
