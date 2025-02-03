<script setup lang="ts">
defineProps<{ modelValue: number | null; options: any[]; label: string; valueKey: string }>();
defineEmits(['update:modelValue']);
</script>

<template>
  <select
    class="w-full p-2 border rounded"
    :value="modelValue"
    @change="$emit('update:modelValue', Number(($event.target as HTMLSelectElement).value))"
  >
    <option value="" disabled>Choisir une option</option>
    <option v-for="option in options" :key="option[valueKey]" :value="option[valueKey]">
      {{ option[label] }}
    </option>
  </select>
</template>
