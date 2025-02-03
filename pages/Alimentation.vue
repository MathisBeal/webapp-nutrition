<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import { useFetch } from '#app';

const selectedType = ref<'plat' | 'aliment'>('plat');
const selectedItem = ref<number | null>(null);
const selectedMoment = ref<number | null>(null);
const plats = ref([]);
const aliments = ref([]);
const moments = ref([]);
const userSession = ref<{ userId: number } | null>(null); 



watchEffect(async () => {
  if (selectedType.value === 'plat') {
    const { data } = await useFetch('/api/plat');
    plats.value = data.value || [];
  } else {
    const { data } = await useFetch('/api/aliment');
    aliments.value = data.value || [];
  }
});


watch(selectedType, () => {
  selectedItem.value = null; 
});



const fetchMoments = async () => {
  const { data } = await useFetch('/api/fetchMoments');
  moments.value = data.value || [];
};

const getSession = async () => {
  try {
    const response = await fetch('/api/auth/session');
    const data = await response.json();
    userSession.value = data?.userId ? data : null;
  } catch (error) {
    console.error("Erreur lors de la récupération de la session utilisateur", error);
    userSession.value = null;
  }
};


const submitSelection = async () => {
  if (!selectedItem.value || !selectedMoment.value || !userSession.value?.userId) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  await useFetch('/api/alimentations', {
    method: 'POST',
    body: JSON.stringify({
      ID_user: userSession.value.userId, 
      ID_plat: selectedType.value === 'plat' ? selectedItem.value : null,
      ID_aliment: selectedType.value === 'aliment' ? selectedItem.value : null,
      ID_moment: selectedMoment.value,
    }),
  });
  selectedItem.value = null;
  selectedMoment.value = null;
};


onMounted(async () => {
  await getSession();
  await fetchMoments();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Sélectionnez un plat ou un aliment</h1>

    <ToggleSelection v-model="selectedType" />

    <DropdownSelect
      v-if="selectedType === 'plat'"
      v-model="selectedItem"
      :options="plats"
      label="description"
      value-key="ID_plat"
    />
    <DropdownSelect
      v-else
      v-model="selectedItem"
      :options="aliments"
      label="nom"
      value-key="ID_aliment"
    />

    <DropdownSelect v-model="selectedMoment" :options="moments" label="nom" value-key="ID_moments" />

    <SubmitButton @click="submitSelection" />
  </div>
</template>

<style scoped>
.p-4 {
  max-width: 500px;
  margin: 0 auto;
}
</style>
