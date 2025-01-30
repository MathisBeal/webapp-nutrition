<template>
  <div class="search-container">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Rechercher..."
      class="search-bar"
      @keyup.enter="onSearch"
    />

    <Pagination
      :results="results"
      :itemsPerPage="10"
      @update:results="filteredResults = $event"
    >
      <template #default="{ results }">
        <div v-for="item in results" :key="item.ID" class="result-item">
          <img src="/assets/img/plat.png" alt="Image" class="result-image" />
          <div class="result-text">
            <template v-if="item.type === 'plat'">
              <h2>{{ item.description || 'Description non disponible' }} - {{ item.nom_categorie || 'Catégorie inconnue' }}</h2>
              <p>
                <img src="/assets/img/horloge.png" alt="Icône d'horloge" class="icon-horloge" />
                Durée de préparation : {{ item.duree || 'Non spécifiée' }}
              </p>
            </template>
            <template v-else-if="item.type === 'aliment'">
              <h2>{{ item.nom }}</h2>
              <p>
                Calories : {{ item.calories }} kcal<br />
                Glucides : {{ item.glucides }} g<br />
                Lipides : {{ item.lipides }} g<br />
                Protéines : {{ item.proteines }} g
              </p>
            </template>
          </div>
          <div class="favori-icon" @click="toggleFavori(item)">
            <img :src="favoris.has(item.ID) ? '/assets/icons/icon_stats.png' : '/assets/icons/icon_user.png'" alt="Favori" class="star-icon">
          </div>
        </div>
      </template>
    </Pagination>

    <!-- Aucun résultat trouvé -->
    <div v-if="!filteredResults.length && searchQuery" class="no-results">
      <img src="/assets/icons/icon_search.png" alt="Icône de loupe" class="no-results-icon" />
      <p class="no-results-text">Aucun résultat</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Pagination from '@/components/Pagination.vue';

const searchQuery = ref('');
const results = ref([]);
const filteredResults = ref([]);
const userSession = ref(null);
const favoris = ref(new Set());

const loadFavoris = async () => {
  if (!userSession.value) return;
  try {
    const response = await fetch(`/api/favoris?userId=${userSession.value.userId}&fullData=true`);
    results.value = await response.json();
    favoris.value = new Set(results.value.map(fav => fav.ID));
  } catch (error) {
    console.error("Erreur lors du chargement des favoris :", error);
  }
};

const onSearch = async () => {
  if (!searchQuery.value.trim()) {
    await loadFavoris();
    return;
  }
  try {
    const response = await fetch(`/api/search?search=${encodeURIComponent(searchQuery.value)}`);
    results.value = await response.json();
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
  }
};

const toggleFavori = async (item) => {
  if (!userSession.value) return;
  const isFavori = favoris.value.has(item.ID);
  const action = isFavori ? "remove" : "add";

  try {
    await fetch('/api/favoris', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID_user: userSession.value.userId, ID_item: item.ID, type: item.type, action: action }),
    });

    favoris.value[isFavori ? 'delete' : 'add'](item.ID);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des favoris :", error);
  }
};
</script>


<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
  padding-left: 200px;
  background-color: #f3f4f6;
  height: 95vh;
  gap: 20px;
}

.search-bar {
  width: 60%;
  max-width: 1000px;
  padding: 15px;
  font-size: 14px;
  border: 2px solid #ccc;
  border-radius: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;
}

.search-bar:focus {
  border-color: #3b82f6;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
}

.result-list:hover {
overflow-y: auto;
}

.result-item {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.result-item:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  background-color: #f9f9f9;
}

.result-item h2 {
margin: 0;
font-size: 1.2rem;
}

.result-item p {
margin: 5px 0 0;
color: #555;
}

.result-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.result-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.result-text h2,
.result-text p {
margin: 0;
text-align: left;
line-height: 1.2;
}

.result-text span {
font-size: 0.9rem;
color: #999;
}

.icon-horloge {
  width: 15px;
  height: 15px;
  object-fit: cover;
  border-radius: 8px;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 50px;
}

.no-results-icon {
  width: 50px;
  height: 50px;
  opacity: 0.7;
}

.no-results-text {
  font-size: 1.2rem;
  color: #555;
  text-align: center;
}

.favori-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.star-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.2s;
}

.favori-icon:hover .star-icon {
  transform: scale(1.1);
}
</style>
