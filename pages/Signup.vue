<template>
  <div>
    <!-- Affichage conditionnel basé sur l'état -->
    <signUp
      v-if="currentStep === 'signUp'"
      @signupSuccess="goToQuestionnaire"
      :userData="userData"
    />
    <Questionnaire
      v-else-if="currentStep === 'Questionnaire'"
      :userData="userData"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentStep = ref('signUp');
const userData = ref({});

// Fonction pour changer de step après une inscription réussie
const goToQuestionnaire = () => {
  currentStep.value = 'Questionnaire';
};
</script>
