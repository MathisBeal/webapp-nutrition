<template>
  <h1 class="questionnaire-title">Veuillez remplir ce bref questionnaire</h1>
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
              ref="ageInput"
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
              ref="heightInput"
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
              ref="weightInput"
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
              ref="optionInput"
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
import { ref, computed, watch, nextTick, onMounted } from 'vue';

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['submitQuestionnaire']);

const questions = ref([
  { question: 'Quel est votre âge ?', options: [] },
  { question: 'Quel est votre sexe ?', options: ['Homme', 'Femme', 'Autre'] },
  { question: 'Quelle est votre taille (en cm) ?', options: [] },
  { question: 'Quel est votre poids (en kg) ?', options: [] },
  {
    question: 'Suivez-vous un régime alimentaire spécifique ?',
    options: [],
  },
  {
    question: 'Êtes-vous allergique à un de ces aliments ?',
    options: ['Aucun'],
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
]);

// Variables de suivi
const selectedOption = ref<(string | null)[]>(questions.value.map(() => null));
const currentQuestionIndex = ref(0);
const height = ref<number | null>(null);
const weight = ref<number | null>(null);
const age = ref<number | null>(null);

const ageInput = ref<HTMLInputElement | null>(null);
const heightInput = ref<HTMLInputElement | null>(null);
const weightInput = ref<HTMLInputElement | null>(null);

const isNextEnabled = computed(() => {
  const enabled = (() => {
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
  })();
  console.debug(`isNextEnabled: ${enabled}`);
  return enabled;
});

const submitAnswers = () => {
  props.userData.age = age.value;
  props.userData.sexe = selectedOption.value[1];
  props.userData.taille = height.value;
  props.userData.poids = weight.value;
  props.userData.imc = 1; //calculé directement par la BDD

  emit('submitQuestionnaire');
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

// Récupérer les options dynamiques pour les questions
const fetchOptions = async () => {
  try {
    const response = await fetch('/api/restrictionType');
    const data = await response.json();

    if (data.success) {
      const dietOptions = data.data.slice(0, 11);
      const allergyOptions = data.data.slice(11);

      const dietQuestion = questions.value.find(q => q.question === 'Suivez-vous un régime alimentaire spécifique ?');
      if (dietQuestion) {
        dietQuestion.options = dietOptions;
      }

      const allergyQuestion = questions.value.find(q => q.question === 'Êtes-vous allergique à un de ces aliments ?');
      if (allergyQuestion) {
        allergyQuestion.options = allergyOptions;
        allergyQuestion.options.unshift('Aucun');
      }
    } else {
      console.error('Erreur lors de la récupération des options:', data.message);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des options:', error);
  }
};

const handleEnterKey = () => {
  console.debug('Enter key pressed');
  if (isNextEnabled.value) {
    console.debug('isNextEnabled is true, moving to next question');
    if (currentQuestionIndex.value < questions.value.length - 1) {
      nextQuestion();
    } else {
      submitAnswers();
    }
  } else {
    console.debug('isNextEnabled is false, cannot move to next question');
  }
};

// Watcher pour focus le champ input ou sélectionner le premier élément
watch(currentQuestionIndex, async (newIndex) => {
  await nextTick();
  if (newIndex === 0) {
    ageInput.value?.focus();
  } else if (newIndex === 2) {
    heightInput.value?.focus();
  } else if (newIndex === 3) {
    weightInput.value?.focus();
  } else {
    selectedOption.value[newIndex] = questions.value[newIndex].options[0];
    console.debug(`Default option selected for question ${newIndex}: ${questions.value[newIndex].options[0]}`);
  }
});

onMounted(() => {
  fetchOptions();
  // Focus sur le champ âge dès le chargement de la première question
  nextTick(() => {
    ageInput.value?.focus();
  });
});
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
