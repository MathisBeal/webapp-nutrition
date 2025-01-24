<template>
  <div>
    <!-- Affichage conditionnel basé sur l'état -->
    <signUp v-if="currentStep === 'signUp'" @signupSuccess="goToQuestionnaire" />
    <Questionnaire v-else-if="currentStep === 'Questionnaire'" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentStep = ref('signUp');
const goToQuestionnaire = () => {
  currentStep.value = 'Questionnaire';
};
</script>
