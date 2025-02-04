<template>
  <button class="w-full p-3 bg-green-500 text-white rounded mt-4" @click="$emit('click')">
    Ajouter
  </button>
</template>


<script setup>
defineEmits(['click']);
</script>



<style scoped>
button {
  width: 100%;
  padding: 0.75em;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.6em;
  border: none;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.3s;
}

button:active {
  transform: scale(0.97);
  opacity: 0.8;
}

</style>