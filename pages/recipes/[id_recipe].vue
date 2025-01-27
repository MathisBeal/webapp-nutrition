<script setup lang="ts">
  const params = useRoute().params;
  const rows = ref(null);

  if (params && params.id_recipe) {
    rows.value = await $fetch(`/api/recipes/${params.id_recipe}`);
    console.log(rows.value)
  }
</script>

<template>
  <h1>
    HEEHEE
  </h1>
  <RecipeDetail v-if="rows" :data_recipe="rows"/>
  <div v-else>
    Could not fetch recipe from database
  </div>
</template>

<style scoped>

</style>
