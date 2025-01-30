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
      @submitQuestionnaire="submitQuestionnaire"
    />
  </div>
</template>

<script lang="ts" setup>
import { type User } from '@/types/User';

const currentStep = ref('signUp');
const userData = ref<User>({
  nom: '',
  prenom: '',
  mail: '',
  password: '',
  age: 0,
  sexe: '',
  taille: 0,
  poids: 0,
  imc: 0,
});
const router = useRouter()

// Fonction pour changer de step après une inscription réussie
const goToQuestionnaire = () => {
  currentStep.value = 'Questionnaire';
};

// Fonction pour soumettre les réponses du questionnaire
const submitQuestionnaire = async () => {
  try {
    const { data: response } = await useFetch('/api/user/', {
      method: 'POST',
      body: userData.value,
    });

    if (response) {
      alert('Questionnaire soumis avec succès !');
      router.push('/login');
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données :', error);
    alert('Une erreur est survenue lors de la soumission du formulaire ou du questionnaire.');
  }
};
</script>
