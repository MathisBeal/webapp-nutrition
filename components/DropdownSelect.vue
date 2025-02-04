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


<script setup lang="ts">
defineProps<{ modelValue: number | null; options: any[]; label: string; valueKey: string }>();
defineEmits(['update:modelValue']);
</script>




<style scoped>
select {
  padding: 0.6em;
  font-size: 1rem;
  border-radius: 0.5em;
  border: 0.1em solid #ccc;
  cursor: pointer;
  transition: border-color 0.3s;
}

select:focus {
  border-color: currentColor;
  outline: none;
}

</style>