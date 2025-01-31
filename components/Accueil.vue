<script lang="ts" setup>
import {useAsyncData} from '#app';
import {isNavVisible} from '@/composables/useNavState';
import Plat from '@/components/Plat.vue';

const {data: plats} = await useAsyncData('plats', () => $fetch('/api/plat'));

const displayedPlats = ref<any[]>([]);
const favoris = ref<Set<number>>(new Set());
const userSession = ref<any>(null);
const pageSize = 5;
let currentPage = 1;

const getSession = async () => {
  try {
    const response = await fetch('/api/auth/session');
    const data = await response.json();
    userSession.value = data?.userId ? data : null;
    if (userSession.value) {
      await loadFavoris();
    }
  } catch (error) {
    userSession.value = null;
  }
};

const loadFavoris = async () => {
  if (!userSession.value) return;

  try {
    const response = await fetch(`/api/favoris?userId=${userSession.value.userId}&fullData=true`);
    const data = await response.json();
    favoris.value = new Set(data.map((fav: any) => fav.ID));
  } catch (error) {
    console.error("Erreur lors du chargement des favoris", error);
  }
};

const toggleFavori = async (plat: any) => {
  if (!userSession.value) {
    return;
  }

  const isFavori = favoris.value.has(plat.ID);
  const action = isFavori ? "remove" : "add";

  try {
    const response = await fetch('/api/favoris', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ID_user: userSession.value.userId,
        ID_item: plat.ID_plat,
        type: 'plat',
        action: action
      }),
    });

    if (response.ok) {
      if (isFavori) {
        favoris.value.delete(plat.ID_plat);
      } else {
        favoris.value.add(plat.ID_plat);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des favoris", error);
  }
};

const loadPlats = () => {
  if (!plats.value) return;
  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;

  const newPlats = plats.value.slice(start, end).map(plat => ({
    ...plat,
    ID: plat.ID_plat,
  }));

  if (newPlats.length) {
    displayedPlats.value.push(...newPlats);
    currentPage++;
  }
};

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
    loadPlats();
  }
};

onMounted(async () => {
  await getSession();
  loadPlats();
});

</script>

<template>
  <div :class="['accueil', { 'with-nav': isNavVisible }]">
    <h1>Plats</h1>
    <div ref="platList" class="plat-list" @scroll="handleScroll">
      <Plat
        v-for="plat in displayedPlats"
        :key="plat.ID_plat"
        :favoris="favoris"
        :plat="plat"
        :toggleFavori="toggleFavori"
      />
    </div>
  </div>
</template>

<style>
.plat-list {
  height: 60vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  padding: 2vh;
  transition: overflow-y 0.3s ease;
}

.plat-text h2,
.plat-text p {
  margin: 0;
  text-align: left;
  line-height: 1.2;
}

.plat-text span {
  font-size: 0.9rem;
  color: #999;
}

.plat-list:hover {
  overflow-y: auto;
}

.favori-icon:hover .star-icon {
  transform: scale(1.1);
}
</style>

