<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';

const params = useRoute().params;
const aliment_data = ref(null);
const error = ref(false);

onMounted(async () => {
  if (params && params.id_aliment) {
    try {
      // Fetch the recipe data from the API
      // @ts-ignore
      aliment_data.value = await $fetch(`/api/aliments/${params.id_aliment}`);
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
    <AlimentDetail v-if="aliment_data" :alimentData="aliment_data"/>
    <div v-else-if="error">
      Could not fetch aliment from database.
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<style scoped>
/* Add styles if needed */
</style>
