<template>
    <div class="accueil">
      <h1>Liste des Aliments</h1>
      <div class="aliment-list">
        <div v-for="aliment in aliments" :key="aliment.ID_aliment" class="aliment-item">
          <h2>{{ aliment.nom }}</h2>
          <p>{{ aliment.image }}</p>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAsyncData } from '#app';

  // Liste des alimetns
  const { data: aliments } = await useAsyncData('aliments', () =>
    $fetch('/api/aliment')
  );
  </script>



