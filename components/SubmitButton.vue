<template>
  <button class="w-full p-3 bg-green-500 text-white rounded mt-4" @click="$emit('click')">
    Ajouter
  </button>
</template>


<script setup>
defineEmits(['click']);
</script>