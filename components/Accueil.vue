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

