<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Sélectionnez un plat ou un aliment</h1>

    <div class="form-group">
      <ToggleSelection v-model="selectedType" />
    </div>

    <div class="form-group">
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
    </div>

    <div class="form-group">
      <DropdownSelect
        v-model="selectedMoment"
        :options="moments"
        label="nom"
        value-key="ID_moments"
      />
    </div>

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
import { Notifications, useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();
const selectedType = ref<"plat" | "aliment">("plat");
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
  if (selectedType.value === "plat") {
    const { data } = await useFetch<Plat[]>("/api/plat");
    plats.value = data.value || [];
  } else {
    const { data } = await useFetch<Aliment[]>("/api/aliment");
    aliments.value = data.value || [];
  }
});

watch(selectedType, () => {
  selectedItem.value = null;
});

const fetchMoments = async () => {
  const { data } = await useFetch("/api/fetchMoments");
  moments.value = data.value || [];
};

const getSession = async () => {
  try {
    const response = await fetch("/api/auth/session");
    const data = await response.json();
    userSession.value = data?.userId ? data : null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la session utilisateur",
      error,
    );
    userSession.value = null;
  }
};

const submitSelection = async () => {
  if (
    !selectedItem.value ||
    !selectedMoment.value ||
    !userSession.value?.userId
  ) {
    notify({ type: "error", text: "Vous n'avez pas choisi d'option" });
    return;
  }

  await useFetch("/api/alimentations", {
    method: "POST",
    body: JSON.stringify({
      ID_user: userSession.value.userId,
      ID_plat: selectedType.value === "plat" ? selectedItem.value : null,
      ID_aliment: selectedType.value === "aliment" ? selectedItem.value : null,
      ID_moment: selectedMoment.value,
      Quantite: quantity.value,
    }),
  });
  selectedItem.value = null;
  selectedMoment.value = null;
  quantity.value = 1;
};

onMounted(async () => {
  await getSession();
  await fetchMoments();
});
</script>

<style scoped>
.p-4 {
  max-width: 500px;
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;

  /* Centrage vertical + horizontal */
  position: absolute;
  top: 50%;
  left: 56%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type="number"] {
  width: 95%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

input[type="number"]:focus {
  border-color: #3b82f6; /* Couleur de focus */
  box-shadow: 0 0 4px rgba(59, 130, 246, 0.5); /* Ombre au focus */
}

.mt-2 {
  margin-top: 1rem;
  width: 100%; /* S'assurer que les éléments prennent toute la largeur */
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #3b82f6; /* Couleur principale */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  margin-top: 1rem; /* Espacement entre les boutons */
}

button:hover {
  background-color: #2563eb; /* Couleur au survol */
  transform: scale(1.02); /* Légère mise en avant */
}

button:active {
  transform: scale(0.98); /* Effet de clic */
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form-group {
  margin-bottom: 1rem; /* Espacement entre les champs */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.form-group > * {
  width: 100%; /* Tous les éléments prennent la même largeur */
}
</style>
