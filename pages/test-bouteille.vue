<script setup lang="ts">
import BottleViewer from "~/components/BottleViewer.vue";
import {ref} from "#imports";

const ratio = ref(0);

const offset = 2;

const increase = () => {
  ratio.value += offset;
  if (ratio.value < 0) {
    ratio.value = 0;
  }
};

const decrease = () => {
  ratio.value -= offset;
  if (ratio.value > 100) {
    ratio.value = 100;
  }
};

</script>

<template>
  <div>
    <BottleViewer :value="ratio"/>
    <button @click="increase" >+</button>
    <button @click="decrease" >-</button>
  </div>
</template>

<style scoped>
div {
  width: auto;
  height: auto;
  text-align: center;
}
</style>
