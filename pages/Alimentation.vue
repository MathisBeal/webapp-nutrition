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

    <div class="mt-2">
      <label for="quantity" class="block mb-1">Quantité</label>
      <input
        id="quantity"
        type="number"
        v-model="quantity"
        min="1"
        class="w-full p-2 border rounded"
      />
    </div>


    <SubmitButton @click="submitSelection" />
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import { Notifications, useNotification } from '@kyvg/vue3-notification';

const { notify } = useNotification();
const selectedType = ref<'plat' | 'aliment'>('plat');
const selectedItem = ref<number | null>(null);
const selectedMoment = ref<number | null>(null);
const plats = ref<Plat[]>([]);
const aliments = ref<Aliment[]>([]);
const moments = ref<Moment[]>([]);
const userSession = ref<{ userId: number } | null>(null);
const quantity = ref(1);

interface Plat {
  ID_plat: number;
  duree: string;
  description: string;
  etapes: string;
  images: string | null;
  ID_categorie: number;
  nom_categorie: string | null;
}

interface Aliment {
  image: string | null;
  nom: string;
  ID_aliment: number;
  quantite_base: number;
  calories: number;
  glucides: number;
  lipides: number;
  proteines: number;
}

interface Moment {
  nom: string;
  ID_moments: number;
}

watchEffect(async () => {
  if (selectedType.value === 'plat') {
    const { data } = await useFetch<Plat[]>('/api/plat');
    plats.value = data.value || [];
  } else {
    const { data } = await useFetch<Aliment[]>('/api/aliment');
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
    notify({ type: 'error', text: "Vous n'avez pas choisi d'option" })
    return;
  }

  await useFetch('/api/alimentations', {
    method: 'POST',
    body: JSON.stringify({
      ID_user: userSession.value.userId,
      ID_plat: selectedType.value === 'plat' ? selectedItem.value : null,
      ID_aliment: selectedType.value === 'aliment' ? selectedItem.value : null,
      ID_moment: selectedMoment.value,
      Quantite: quantity.value
    }),
  });
  selectedItem.value = null;
  selectedMoment.value = null;
  quantity.value=1;
};

onMounted(async () => {
  await getSession();
  await fetchMoments();
});
</script>



<style scoped>
.p-4 {
  max-width: 500px;
  margin: 0 auto;
}
</style>
