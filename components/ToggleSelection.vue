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
