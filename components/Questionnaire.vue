<template>
  <div class="questionnaire-container">
    <div class="question-box">
      <!-- Affichage de la question actuelle et du total -->
      <h2>{{ questions[currentQuestionIndex].question }}</h2>
      <p class="progress-info">
        Question {{ currentQuestionIndex + 1 }} sur {{ questions.length }}
      </p>

      <form>
        <!-- Question spécifique pour l'âge -->
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

        <!-- Question spécifique pour la taille -->
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

        <!-- Question spécifique pour le poids -->
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
              Votre poids semble incorrect, veuillez vérifier votre saisie.
            </p>
          </div>
        </template>

        <!-- Options pour les autres questions -->
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

// Questions du formulaire
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
  {
    question: 'Combien d’eau buvez-vous en moyenne par jour ?',
    options: [
      'Moins de 0.5 litres',
      '0.5-1 litres',
      '1-2 litres',
      '2-3 litres',
      'Plus de 3 litres',
    ],
  },
  {
    question:
      'Quels sont vos objectifs principaux en matière de santé et de nutrition ?',
    options: [
      'Perdre du poids',
      'Améliorer ma santé générale',
      'Gagner du muscle',
      'Maintenir mon poids',
      'Améliorer mes habitudes alimentaires',
    ],
  },
]);

// Variables de suivi
const selectedOption = ref<(string | null)[]>(questions.value.map(() => null));
const currentQuestionIndex = ref(0);
const height = ref<number | null>(null);
const weight = ref<number | null>(null);
const age = ref<number | null>(null);

// Validation pour activer le bouton "Suivant"
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

// Navigation
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

// Soumission des réponses
const submitAnswers = () => {
  console.log('Réponses :', selectedOption.value, 'Âge :', age.value, 'Taille :', height.value, 'Poids :', weight.value);
  alert('Questionnaire soumis avec succès !');
};
</script>


<style scoped>
/* Styles principaux */
.questionnaire-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.question-box {
  margin-bottom: 20px;
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
