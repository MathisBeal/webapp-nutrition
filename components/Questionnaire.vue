<template>
  <h1 class="questionnaire-title">Veuillez remplir ce bref questionnaire</h1>
  <div class="questionnaire-container">
    <div class="question-box">
      <h2>{{ questions[currentQuestionIndex].question }}</h2>
      <p class="progress-info">
        Question {{ currentQuestionIndex + 1 }} sur {{ questions.length }}
      </p>

      <form>
        <template v-if="currentQuestionIndex === 0">
          <div class="option">
            <label for="age">Votre âge :</label>
            <input
              type="number"
              id="age"
              v-model="age"
              placeholder="Entrez votre âge"
            />
            <p v-if="age !== null && (age <= 0 || age > 100)" class="error">
              Votre âge semble incorrect, veuillez vérifier votre saisie.
            </p>
          </div>
        </template>

        <template v-if="currentQuestionIndex === 2">
          <div class="option">
            <label for="height">Votre taille (cm) :</label>
            <input
              type="number"
              id="height"
              v-model="height"
              placeholder="Entrez votre taille en cm"
            />
            <p v-if="height !== null && (height <= 50 || height > 250)" class="error">
              Votre taille semble incorrecte, veuillez vérifier votre saisie.
            </p>
          </div>
        </template>

        <template v-else-if="currentQuestionIndex === 3">
          <div class="option">
            <label for="weight">Votre poids (kg) :</label>
            <input
              type="number"
              id="weight"
              v-model="weight"
              placeholder="Entrez votre poids en kg"
            />
            <p v-if="weight !== null && (weight <= 20 || weight > 300)" class="error">
              Votre poids semble incorrecte, veuillez vérifier votre saisie.
            </p>
          </div>
        </template>

        <template v-else>
          <div
            v-for="(option, index) in questions[currentQuestionIndex].options"
            :key="index"
            class="option"
          >
            <input
              type="radio"
              :id="'option-' + index"
              name="question"
              :value="option"
              v-model="selectedOption[currentQuestionIndex]"
            />
            <label :for="'option-' + index">{{ option }}</label>
          </div>
        </template>
      </form>

      <div class="navigation-buttons">
        <button
          v-if="currentQuestionIndex > 0"
          @click="previousQuestion"
          class="previous-button"
        >
          Précédent
        </button>
        <button
          v-if="currentQuestionIndex < questions.length - 1"
          @click="nextQuestion"
          class="next-button"
          :class="{ 'align-right': currentQuestionIndex === 0 }"
          :disabled="!isNextEnabled"
        >
          Suivant
        </button>
        <button
          v-else
          @click="submitAnswers"
          class="submit-button"
          :disabled="!isNextEnabled"
        >
          Terminer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from '#app';
import { defineProps } from 'vue';

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const questions = ref([
  { question: 'Quel est votre âge ?', options: [] },
  { question: 'Quel est votre sexe ?', options: ['Homme', 'Femme', 'Autre'] },
  { question: 'Quelle est votre taille (en cm) ?', options: [] },
  { question: 'Quel est votre poids (en kg) ?', options: [] },
  {
    question: 'Suivez-vous un régime alimentaire spécifique ?',
    options: [
      'Général',
      'Végétarien',
      'Vesco Végétarien',
      'Végan',
      'Sans gluten',
      'Sans lactose',
      'Cétogène',
      'Paléo',
    ],
  },
  {
    question:
      'Êtes-vous intéressé par un plan de nutrition personnalisé pour perdre, maintenir ou gagner du poids ?',
    options: [
      'Perdre du poids',
      'Maintenir mon poids',
      'Gagner du poids',
      'Je ne sais pas',
    ],
  },
  {
    question: 'Êtes-vous allergique à un de ces aliments ?',
    options: [
      'Aucun',
      'Arachides',
      'Fruits à coque',
      'Lait et produits laitiers',
      'Gluten',
      'Fruits de mer',
      'Œufs',
      'Soja',
      'Sésame',
    ],
  },
]);

const selectedOption = ref<(string | null)[]>(questions.value.map(() => null));
const currentQuestionIndex = ref(0);
const height = ref<number | null>(null);
const weight = ref<number | null>(null);
const age = ref<number | null>(null);

const isNextEnabled = computed(() => {
  if (currentQuestionIndex.value === 0) {
    return age.value !== null && age.value > 0 && age.value <= 100;
  }
  if (currentQuestionIndex.value === 2) {
    return height.value !== null && height.value > 50 && height.value <= 250;
  }
  if (currentQuestionIndex.value === 3) {
    return weight.value !== null && weight.value > 20 && weight.value <= 300;
  }
  return selectedOption.value[currentQuestionIndex.value] !== null;
});

const calculateIMC = (height: number | null, weight: number | null): number | null => {
  if (height && weight) {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  }
  return null;
};

const submitAnswers = async () => {
  props.userData.age = age.value;
  props.userData.sexe = selectedOption.value[1];
  props.userData.taille = height.value;
  props.userData.poids = weight.value;
  props.userData.imc = calculateIMC(height.value, weight.value);

  try {
    const { data: response } = await useFetch('/api/signup', {
      method: 'POST',
      body: props.userData,
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

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};
</script>

<style scoped>
.questionnaire-title {
  text-align: center;
  font-size: 50px;
  color: #333;
  margin-bottom: 20px;
}

.questionnaire-container {
  margin: 50px auto;
  background-color: #ffffff;
}

.progress-info {
  font-size: 16px;
  color: #555;
  margin-top: 10px;
}

.option {
  margin: 10px 0;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.other-input {
  margin-top: 15px;
}

.other-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.other-textarea {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  resize: none;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Bouton suivant aligné à droite */
.align-right {
  margin-left: auto;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.previous-button,
.next-button {
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
</style>
