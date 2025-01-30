<template>
  <div :class="['accueil', { 'with-nav': isNavVisible }]">
    <h1>Plats</h1>
    <div class="plat-list" @scroll="handleScroll" ref="platList">
      <div
        v-for="plat in displayedPlats"
        :key="plat.ID_plat"
        class="plat-item"
      >
        <img alt="Image du plat" class="plat-image" src="/assets/img/plat.png" @click="goToRecipe(plat.ID_plat)"/>
        <div class="plat-text" @click="goToRecipe(plat.ID_plat)">
          <h2>
            {{ plat.description || 'Description non disponible' }} -
            {{ plat.nom_categorie || 'Catégorie inconnue' }}
          </h2>
          <p>
            <img
              src="/assets/img/horloge.png"
              alt="Icône d'horloge"
              class="icon-horloge"
            />
            Durée de préparation : {{ plat.duree || 'Non spécifiée' }}
          </p>
        </div>
        <div class="favori-icon" @click.stop="toggleFavori(plat)">
          <IconStar v-if="favoris.has(plat.ID_plat)" class="star-icon filled" />
          <IconStarOff v-else class="star-icon empty" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { isNavVisible } from '@/composables/useNavState';

const { data: plats } = await useAsyncData('plats', () => $fetch('/api/plat'));
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

    const isFavori = favoris.value.has(plat.ID_plat);
    const action = isFavori ? "remove" : "add";

    try {
        const response = await fetch('/api/favoris', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

    const newPlats = plats.value.slice(start, end);
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

<style scoped>
.plat-list {
  height: 60vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  padding: 2vh;
  transition: overflow-y 0.3s ease;
}

.plat-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  gap: 0.5vh;
}

.plat-text h2,
.plat-text p {
  margin: 0; 
  text-align: left; 
  line-height: 1.2em; 

.plat-item:hover {
  transform: scale(1.01); 
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); 
  background-color: #f9f9f9; 
}

.plat-text span {
  font-size: 0.9rem;
  color: #999;
}

.icon-horloge {
  width: 1.5vw;
  height: 1.5vw;
  object-fit: cover;
  border-radius: 0.5em;
}

.plat-image {
  width: 7vw;
  height: 7vw;
  object-fit: cover;
  border-radius: 0.5em;
}

.plat-list:hover {
  overflow-y: auto;
}

.plat-item {
  display: flex;
  align-items: flex-start;
  gap: 1vw;
  padding: 2vh;
  border-radius: 1em;
  background-color: #fff;
  box-shadow: 0 0.4vh 0.6vh rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.plat-item:hover {
  transform: scale(1.01);
  box-shadow: 0 0.6vh 1vh rgba(0, 0, 0, 0.15);
  background-color: #f9f9f9;
  flex-direction: column;
  align-items: flex-start; 
  gap: 5px;
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

