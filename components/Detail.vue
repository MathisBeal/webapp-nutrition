<template>
    <!-- <div class="detail">
      <h1>Liste des Groupes</h1>
      <div class="group-list">
        <div v-for="group in groups" :key="group.grp_code" class="group-item">
          <h2>{{ group.nom_fr }}</h2>
          <p>{{ group.nom_en }}</p>
        </div>
      </div>
    </div> -->
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAsyncData } from '#app';

  // // Liste des groupes
  // const { data: groups } = await useAsyncData('groups', () =>
  //   $fetch('/api/grp')
  // );
  </script>



