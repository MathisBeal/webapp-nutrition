<script lang="ts" setup>
const props = defineProps({
  ingredient: {
    type: Object,
    required: true,
  }
})

const id_alim = props.ingredient.ID_aliment;
const nom = props.ingredient.Aliments.nom;
const qty = Number.parseFloat(props.ingredient.Aliments.quantite_base) * Number.parseFloat(props.ingredient.multiplicateur_quantite);
const unite = props.ingredient.Aliments.unite;

</script>

<template>
  <div class="ingredient">
    <NuxtLink :to="{name: 'aliments-id_aliment', params: {id_aliment: id_alim}}">
      <img class="ingredient-img" src="assets/img/ingredient-placeholder.jpg"/>
    </NuxtLink>
    <p class="ingredient-text"><strong>{{ nom }}</strong>: {{ qty }} {{ unite }}</p>
  </div>
</template>

<style scoped>

.ingredient {
  display: flex;
  margin: 0 0 0.4em 0.6em;
  align-items: center;
}

.ingredient-img {
  --img-size: 50px;
  width: var(--img-size);
  height: var(--img-size);
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(106, 106, 106, 0.7);
}

.ingredient-text {
  margin: 0 1em;
}

a {
  line-height: 0;
}

</style>
