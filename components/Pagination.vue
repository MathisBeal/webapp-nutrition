<template>
  <div class="pagination-container">
    <!-- Liste des résultats paginés avec un scroll interne -->
    <div ref="resultList" class="result-list">
      <slot :results="paginatedResults"></slot>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">Précédent</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">Suivant</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  results: Array,
  itemsPerPage: {
    type: Number,
    default: 10
  }
});

const emit = defineEmits(['update:results']);
const currentPage = ref(1);
const resultList = ref(null);

const totalPages = computed(() => Math.ceil((props.results?.length || 0) / props.itemsPerPage));

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  return props.results?.slice(start, start + props.itemsPerPage) || [];
});

// Émettre les résultats filtrés au parent
watch([paginatedResults, currentPage], () => {
  emit('update:results', paginatedResults.value);
  scrollToTop();
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const scrollToTop = () => {
  if (resultList.value) {
    resultList.value.scrollTop = 0;
  }
};

onMounted(scrollToTop);
</script>

<style scoped>
.pagination-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.result-list {
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  margin-left: 11vw;
  overflow-y: auto;
  width: 80vw;
  gap: 2vh;
  padding: 1vh;
  border-radius: 1vw;
  scroll-behavior: smooth;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
  margin-top: 5vh;
  margin-left: 10vw;
}

.pagination button {
  padding: 1vh 2vw;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  background-color: #3b82f6;
  color: white;
  font-size: 1rem;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
}
</style>
