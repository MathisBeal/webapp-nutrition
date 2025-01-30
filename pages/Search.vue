<template>
  <div class="search-container">
    <input
      v-model="searchQuery"
      class="search-bar"
      placeholder="Rechercher..."
      type="text"
      @keyup.enter="onSearch"
    />

    <Pagination
      :itemsPerPage="10"
      :results="results"
      @update:results="filteredResults = $event"
    >
      <template #default="{ results }">
        <div v-for="item in results" :key="item.ID" class="result-item">
          <img alt="Image" class="result-image" src="/assets/img/plat.png"/>
          <div class="result-text">
            <template v-if="item.type === 'plat'">
              <h2>{{ item.description || 'Description non disponible' }} - {{
                  item.nom_categorie || 'Catégorie inconnue'
                }}</h2>
              <p>
                <img alt="Icône d'horloge" class="icon-horloge" src="/assets/img/horloge.png"/>
                Durée de préparation : {{ item.duree || 'Non spécifiée' }}
              </p>
            </template>
            <template v-else-if="item.type === 'aliment'">
              <h2>{{ item.nom }}</h2>
              <p>
                Calories : {{ item.calories }} kcal<br/>
                Glucides : {{ item.glucides }} g<br/>
                Lipides : {{ item.lipides }} g<br/>
                Protéines : {{ item.proteines }} g
              </p>
            </template>
          </div>
          <div class="favori-icon" @click.stop="toggleFavori(item)">
            <IconStar v-if="favoris.has(item.ID)" class="star-icon filled"/>
            <IconStarOff v-else class="star-icon empty"/>
          </div>
        </div>
      </template>
    </Pagination>

    <!-- Aucun résultat trouvé -->
    <div v-if="!filteredResults.length && searchQuery" class="no-results">
      <img alt="Icône de loupe" class="no-results-icon" src="/assets/icons/icon_search.png"/>
      <p class="no-results-text">Aucun résultat</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getSession, userId} from '@/composables/useAuth';

const searchQuery = ref<string>('');
const results = ref<any[]>([]);
const filteredResults = ref([]);
const searchInput = ref<HTMLInputElement | null>(null);
const favoris = ref<Set<number>>(new Set());

const onSearch = async () => {
  if (!searchQuery.value.trim()) {
    await loadFavoris();
    return;
  }
  try {
    const response = await fetch(`/api/search?search=${encodeURIComponent(searchQuery.value)}`);
    const data = await response.json();
    results.value = data;
  } catch (error) {
  }
};

const toggleFavori = async (item: any) => {
  if (!userId.value) {
    return;
  }
  const isFavori = favoris.value.has(item.ID);
  const action = isFavori ? "remove" : "add";

  try {
    const response = await fetch('/api/favoris', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ID_user: userId.value,
        ID_item: item.ID,
        type: item.type,
        action: action
      }),
    });

    if (response.ok) {
      if (isFavori) {
        favoris.value.delete(item.ID);
        results.value = results.value.filter(fav => fav.ID !== item.ID);
      } else {
        favoris.value.add(item.ID);
      }
    }
  } catch (error) {
  }
};

const loadFavoris = async () => {
  if (!userId.value) return;
  try {
    const response = await fetch(`/api/favoris?userId=${userId.value}&fullData=true`);
    const data = await response.json();
    results.value = data;
    favoris.value = new Set(data.map((fav: any) => fav.ID));
  } catch (error) {
  }
};

onMounted(async () => {
  const isLoggedIn = await getSession();
  if (isLoggedIn) {
    await loadFavoris();
  }
  searchInput.value?.focus();
});

watch(userId, async (newUserId) => {
  if (newUserId) {
    await loadFavoris();
  } else {
    results.value = [];
    favoris.value.clear();
  }
});
</script>


<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5vh;
  background-color: #f3f4f6;
  height: 100vh;
  gap: 2vh;
}

.search-bar {
  width: 60vw;
  max-width: 62.5vw;
  padding: 1.5vh;
  font-size: 0.875rem;
  border: 0.15em solid #ccc;
  border-radius: 2.5em;
  box-shadow: 0 0.4vh 1vh rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;
}

.search-bar:focus {
  border-color: #3b82f6;
  box-shadow: 0 0.4vh 2vh rgba(59, 130, 246, 0.3);
}

.result-item {
  display: flex;
  align-items: flex-start;
  gap: 1vw;
  padding: 2vh;
  border-radius: 1em;
  background-color: #fff;
  box-shadow: 0 0.4vh 0.6vh rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.result-item:hover {
  transform: scale(1.01);
  box-shadow: 0 0.6vh 1vh rgba(0, 0, 0, 0.15);
  background-color: #f9f9f9;
}

.result-item h2 {
  margin: 0;
  font-size: 1.2rem;
}

.result-item p {
  margin: 0.5vh 0 0;
  color: #555;
}

.result-image {
  width: 7vw;
  height: 7vw;
  object-fit: cover;
  border-radius: 0.5em;
}

.result-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5vh;
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
  width: 1vw;
  height: 1vw;
  object-fit: cover;
  border-radius: 0.5em;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  margin-top: 5vh;
}

.no-results-icon {
  width: 3vw;
  height: 3vw;
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
  width: 1.5vw;
  height: 1.5vw;
  transition: transform 0.2s;
  color: #FFD700;
}

.star-icon.empty {
  color: #ccc;
}

.favori-icon:hover .star-icon {
  transform: scale(1.1);
}
</style>
