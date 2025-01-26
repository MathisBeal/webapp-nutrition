<template>
  <div :class="['accueil', { 'with-nav': isNavVisible }]">
    <h1>Plats</h1>
    <div class="plat-list" @scroll="handleScroll" ref="platList">
      <div
        v-for="plat in displayedPlats"
        :key="plat.ID_plat"
        class="plat-item"
      >
        <img src="/assets/img/plat.png" alt="Image du plat" class="plat-image" />
        <div class="plat-text">
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
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAsyncData } from '#app';
import { isNavVisible } from '@/composables/useNavState';

const { data: plats } = await useAsyncData('plats', () => $fetch('/api/plat'));

const displayedPlats = ref<any[]>([]); 
const pageSize = 5; 
let currentPage = 1;


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


onMounted(() => {
  loadPlats();
});
</script>




<style>
.plat-list {
  height: 600px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  gap:20px;
  padding: 20px;
  transition: overflow-y 0.3s ease; 
}

.plat-list:hover {
  overflow-y: auto;
}


.plat-item {
  display: flex;
  align-items: flex-start; 
  gap: 15px;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.plat-item:hover {
  transform: scale(1.01); 
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); 
  background-color: #f9f9f9; 
}

.plat-item h2 {
  margin: 0;
  font-size: 1.2rem;
}

.plat-item p {
  margin: 5px 0 0;
  color: #555;
}


.plat-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.plat-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  gap: 5px;
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


.icon-horloge {
  width: 15px;
  height: 15px;
  object-fit: cover;
  border-radius: 8px;
}
</style>