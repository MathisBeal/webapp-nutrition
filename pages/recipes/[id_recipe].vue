<script setup lang="ts">
  const params = useRoute().params;
  const rows = ref(null);

  if (params && params.id_recipe) {
    rows.value = await $fetch(`/api/recipes/${params.id_recipe}`);
    console.log(rows.value)
  }
</script>

<template>
  <RecipeDetail v-if="rows" :recipe_data="rows"/>
  <div v-else>
    Could not fetch recipe from database
  </div>
</template>

<style scoped>

</style>
