<template>
  <div class="flex justify-center gap-4 mb-4">
    <button
      :class="modelValue === 'plat' ? 'bg-blue-500 text-white' : 'bg-gray-200'"
      @click="$emit('update:modelValue', 'plat')"
      class="p-2 rounded"
    >
      Plats
    </button>
    <button
      :class="modelValue === 'aliment' ? 'bg-blue-500 text-white' : 'bg-gray-200'"
      @click="$emit('update:modelValue', 'aliment')"
      class="p-2 rounded"
    >
      Aliments
    </button>
  </div>
</template>



<script setup lang="ts">
defineProps<{ modelValue: 'plat' | 'aliment' }>();
defineEmits(['update:modelValue']);
</script>




<style scoped>
button {
  padding: 0.5em 1em;
  border-radius: 0.5em;
  font-size: 1rem;
  font-weight: bold;
  border: 0.1em solid transparent;
  cursor: pointer;
  transition: border-color 0.3s, transform 0.1s;
}

button:hover {
  border-color: currentColor;
}

button:active {
  transform: scale(0.95);
}

</style>