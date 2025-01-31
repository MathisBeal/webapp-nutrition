<script lang="ts" setup>

import {getSession, userId} from '@/composables/useAuth';
import Plat from '@/components/Plat.vue';
import Aliment from '@/components/Aliment.vue';


const searchQuery = ref<string>('');
const results = ref<any[]>([]);
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
    console.log(data);
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
    console.log(data);
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

<template>
  <div class="search-container">
    <input ref="searchInput" v-model="searchQuery" class="search-bar" placeholder="Rechercher..." type="text"
           @keyup.enter="onSearch"/>
    <div v-if="results.length" class="result-list">
      <div v-for="item in results" :key="item.ID">
        <Plat v-if="item.type === 'plat'" :favoris="favoris" :plat="item"
              :toggleFavori="toggleFavori"/>

        <Aliment v-else-if="item.type === 'aliment'" :aliment="item" :favoris="favoris"
                 :toggleFavori="toggleFavori"/>
      </div>
    </div>
    <div v-else class="no-results">
      <img alt="Icône de loupe" class="no-results-icon" src="/assets/icons/icon_search.png"/>
      <p class="no-results-text">Aucun résultat</p>
    </div>
  </div>
</template>

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

.result-list {
  height: 60vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  width: 50vw;
  gap: 2vh;
  padding: 2vh;
  transition: overflow-y 0.3s ease;
}

.result-list:hover {
  overflow-y: auto;
}

.result-item h2 {
  margin: 0;
  font-size: 1.2rem;
}

.result-item p {
  margin: 0.5vh 0 0;
  color: #555;
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

.favori-icon:hover .star-icon {
  transform: scale(1.1);
}
</style>
