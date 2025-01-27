<template>
  <div>
    <!-- Affichage conditionnel basé sur l'état -->
    <signUp
      v-if="currentStep === 'signUp'"
      @signupSuccess="goToQuestionnaire"
    />
    <Questionnaire
      v-else-if="currentStep === 'Questionnaire'"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentStep = ref('signUp');
const userData = ref({
  age: null,
  sexe: null,
  taille: null,
  poids: null,
  imc: null,
});

// Fonction pour changer de step après une inscription réussie
const goToQuestionnaire = () => {
  currentStep.value = 'Questionnaire';
};
</script>
