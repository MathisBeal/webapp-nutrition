<script setup lang="ts">
defineProps({
  data_recipe: {
    type: Array,
    required: true,
  },
});



</script>

<template>
  <div class="container">

  <h2>
    YEET
  </h2>
  <div v-for="(item, index) in data_recipe" :key="index">
    <!-- Display data from data_recipe -->
    <p>{{ item }}</p>
  </div>
  </div>
</template>


<style scoped>
.container {
  margin-inline: 11em;
  background: red;
}

</style>
