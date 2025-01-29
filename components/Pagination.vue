<template>
  <div class="pagination-container">
    <!-- Liste des résultats paginés avec un scroll interne -->
    <div class="result-list" ref="resultList">
      <slot :results="paginatedResults"></slot>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
  results: Array, // Liste complète des résultats
  itemsPerPage: {
    type: Number,
    default: 10
  }
});

const emit = defineEmits(['update:results']);
const currentPage = ref(1);
const resultList = ref(null);

// Calcul du nombre total de pages
const totalPages = computed(() => Math.ceil((props.results?.length || 0) / props.itemsPerPage));

// Extraction des résultats paginés
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  return props.results?.slice(start, start + props.itemsPerPage) || [];
});

// Émettre les résultats filtrés au parent
watch([paginatedResults, currentPage], () => {
  emit('update:results', paginatedResults.value);
  scrollToTop(); // Remonter la liste en haut après un changement de page
});

// Passage à la page suivante
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Retour à la page précédente
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Remonter la liste au changement de page
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

/* Zone scrollable */
.result-list {
  display: flex;
  flex-direction: column;
  max-height: 540px; /* Ajuste cette valeur selon la mise en page */
  overflow-y: auto;
  width: 1200px;
  gap: 20px;
  padding: 10px;
  border-radius: 5px;
  scroll-behavior: smooth;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.pagination button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3b82f6;
  color: white;
  font-size: 14px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
</style>
