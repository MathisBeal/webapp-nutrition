<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import {
  Chart,
  registerables,
  type ChartData,
  type ChartOptions,
} from 'chart.js';

Chart.register(...registerables);

export default defineComponent({
  name: 'PieChart',
  props: {
    data: {
      type: Object as () => ChartData,
      required: true,
    },
    options: {
      type: Object as () => ChartOptions,
      default: () => ({}),
    },
  },
  setup(props) {
    const chartCanvas = ref<HTMLCanvasElement | null>(null);
    let chartInstance: Chart | null = null;

    onMounted(() => {
      if (chartCanvas.value) {
        chartInstance = new Chart(chartCanvas.value, {
          type: 'doughnut',
          data: props.data,
          options: props.options,
        });
      }
    });

    return {
      chartCanvas,
    };
  },
});
</script>

<style scoped>
canvas {
  height: 100px;
}
</style>
