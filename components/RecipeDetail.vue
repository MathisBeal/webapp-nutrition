<script lang="ts" setup>
import {ref} from 'vue';

// Define props for the component
const props = defineProps({
  recipe_data: {
    type: Array,
    required: true,
  },
});

// Extract the recipe title from the first object in the array
const title = ref(props.recipe_data[0]?.description || '');

// Group ingredients by their `nom` field for better display
const ingredients = ref(
  props.recipe_data.map((item) => ({
    name: item.nom,
    quantity: item.quantite_base * parseFloat(item.multiplicateur_quantite),
    unit: item.unite,
    image: item.image,
    calories: item['calories(kcal)'],
    proteins: item['Protéines(g)'],
    lipids: item['lipides(g)'],
    carbs: item['glucides(g)'],
  }))
);

// Extract the steps from the first item
const rawSteps = props.recipe_data[0]?.etapes || '';
// Split the steps into an array using regex to match numbered points (e.g., "1.", "2.")
const steps = ref(
  rawSteps
    .split(/\d+\.\s/) // Match numbers followed by a period and space
    .filter((step) => step.trim() !== '') // Remove empty strings caused by splitting
    .map((step) => step.trim()) // Trim any extra spaces
);
console.log(steps)


</script>

<template>
  <div class="container">
    <h1 class="recipe_name">{{ title }}</h1>

    <!-- Ingredients List -->
    <div class="ingredients">
      <h2>Ingrédients</h2>
      <ul>
        <li v-for="(ingredient, index) in ingredients" :key="index" class="ingredient">
          <img :alt="ingredient.name" :src="ingredient.image"/>
          <p><strong>{{ ingredient.name }}</strong>: {{ ingredient.quantity }} {{ ingredient.unit }}</p>
        </li>
      </ul>
    </div>

    <!-- Recipe Steps -->
    <div class="steps">
      <h2>Étapes :</h2>
      <ol>
        <li v-for="(step, index) in steps" :key="index">{{ step }}</li>
      </ol>
    </div>

  </div>
</template>

<style scoped>
.container {
  margin-inline: 11em;
  padding: 2em 3em;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.recipe_name {
  text-align: center;
}

.steps {
  margin-bottom: 2em;
}

.steps p {
  margin-left: 2em;
}

.ingredients ul {
  list-style: none;
  padding: 0;
}

.ingredient {
  display: flex;
  align-items: center;
  margin: 0 0 0.5em 2em;
}

.ingredient img {
  width: 50px;
  height: 50px;
  margin-right: 1em;
  border-radius: 33%;
  object-fit: cover;
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
