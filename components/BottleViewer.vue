<template>
  <div id="bottle-container">
    <img src="assets/img/bottle_mask.png" alt="" :style="styleObject">
  </div>
</template>

<script setup lang="ts">
import {reactive, watch} from "#imports";

const props = defineProps({
  value: {
    type: Number,
    required: true,
  }
});

const styleObject = reactive({
  background: '',
});

watch(
  () => props.value,
  (newValue) => {
    const offset = 1;

    let min_water, max_water;

    min_water = props.value;
    max_water = min_water + offset;

    max_water = Math.min(max_water, 100);
    min_water = Math.min(min_water, max_water - offset);

    min_water = Math.max(min_water, 0);
    max_water = Math.max(min_water + offset, max_water);

    styleObject.background = `linear-gradient(0deg, rgba(0,213,255,1) ${min_water}%, rgba(200,234,255,0) ${max_water}%)`;
  },
  { immediate: true }
);
</script>

<style scoped>
#bottle-container {
  background: #cacaca;
  width: fit-content;
  height: fit-content;
  margin-inline: auto;
  margin-bottom: 5em;
  padding: 0;
  line-height: 0;
}
</style>
