<template>
  <h1 class="questionnaire-title">Veuillez remplir ce bref questionnaire</h1>
  <div class="questionnaire-container">
    <div class="question-box">
      <!-- Affichage de la question actuelle et du total -->
      <h2>{{ questions[currentQuestionIndex].question }}</h2>
      <p class="progress-info">
        Question {{ currentQuestionIndex + 1 }} sur {{ questions.length }}
      </p>

      <!-- Question spécifique pour l'âge -->
      <form @keydown.enter.prevent="handleEnterKey">
        <template v-if="currentQuestionIndex === 0">
          <div class="option">
            <label for="age">Votre âge : </label>
            <input
              id="age"
              ref="ageInput"
              v-model="age"
              placeholder="Entrez votre âge"
              type="number"
            />
          </div>
        </template>

        <!-- Question spécifique pour la taille -->
        <template v-if="currentQuestionIndex === 2">
          <div class="option">
            <label for="height">Votre taille (cm) : </label>
            <input
              id="height"
              ref="heightInput"
              v-model="height"
              placeholder="Entrez votre taille en cm"
              type="number"
            />
          </div>
        </template>

        <!-- Question spécifique pour le poids -->
        <template v-else-if="currentQuestionIndex === 3">
          <div class="option">
            <label for="weight">Votre poids (kg) : </label>
            <input
              id="weight"
              ref="weightInput"
              v-model="weight"
              placeholder="Entrez votre poids en kg"
              type="number"
            />
          </div>
        </template>

        <!-- Questions à choix unique (radio) pour Sexe et Plan Nutritionnel -->
        <template v-else-if="questions[currentQuestionIndex].options.length > 0 && currentQuestionIndex !== 4 && currentQuestionIndex !== 5">
          <div
            v-for="(option, index) in questions[currentQuestionIndex].options"
            :key="index"
            class="option"
          >
            <input
              :id="'option-' + currentQuestionIndex + '-' + index"
              v-model="selectedOption[currentQuestionIndex]"
              :value="option"
              name="question"
              type="radio"
            />
            <label :for="'option-' + currentQuestionIndex + '-' + index">{{ option }}</label>
          </div>
        </template>

        <!-- Questions à choix multiple (checkbox) pour Régimes et Allergies -->
        <template v-else-if="currentQuestionIndex === 4 || currentQuestionIndex === 5">
          <div
            v-for="(option, index) in questions[currentQuestionIndex].options"
            :key="index"
            class="option"
          >
            <input
              :id="'option-' + currentQuestionIndex + '-' + index"
              v-model="selectedRestrictions"
              :value="option"
              type="checkbox"
            />
            <label :for="'option-' + currentQuestionIndex + '-' + index">{{ option }}</label>
          </div>
        </template>
      </form>

      <div class="navigation-buttons">
        <button
          v-if="currentQuestionIndex > 0"
          class="previous-button"
          @click="previousQuestion"
        >
          Précédent
        </button>
        <button
          v-if="currentQuestionIndex < questions.length - 1"
          :class="{ 'align-right': currentQuestionIndex === 0 }"
          :disabled="!isNextEnabled"
          class="next-button"
          @click="nextQuestion"
        >
          Suivant
        </button>
        <button
          v-else
          :disabled="!isNextEnabled"
          class="submit-button"
          @click="submitAnswers"
        >
          Terminer
        </button>
      </div>
    </div>
    <NuxtNotifications class="custom-notif"
    position="top center"
    :speed="500"/>
  </div>
</template>


<script lang="ts" setup>
import questionsData from '~/content/questions.json';
//import { NuxtNotifications } from '#components';

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});

//const { notify } = useNotification();
const emit = defineEmits(['submitQuestionnaire']);
const questions = ref(questionsData);
const selectedOption = ref<(string | null)[]>(questions.value.map(() => null));
const currentQuestionIndex = ref(0);
const height = ref<number | null>(null);
const weight = ref<number | null>(null);
const age = ref<number | null>(null);
const selectedRestrictions = ref<string[]>([]);
const ageInput = ref<HTMLInputElement | null>(null);
const heightInput = ref<HTMLInputElement | null>(null);
const weightInput = ref<HTMLInputElement | null>(null);
const isSubmitted = ref(false); // Ajoutez cet état

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
  return enabled;
});

const validateInputs = () => {
  if (isSubmitted.value) return true; // Ne pas valider si déjà soumis

  if (age.value !== null && (age.value <= 0 || age.value > 100)) {
    // notify({
    //   type: 'error',
    //   title: 'Erreur',
    //   text: 'Votre âge semble incorrect, veuillez vérifier votre saisie.'
    // });
    return false;
  }
  if (weight.value !== null && (weight.value <= 20 || weight.value > 300)) {
    // notify({
    //   type: 'error',
    //   title: 'Erreur',
    //   text: 'Votre poids semble incorrect, veuillez vérifier votre saisie.'
    // });
    return false;
  }
  if (height.value !== null && (height.value <= 50 || height.value > 250)) {
    // notify({
    //   type: 'error',
    //   title: 'Erreur',
    //   text: 'Votre taille semble incorrecte, veuillez vérifier votre saisie.'
    // });
    return false;
  }
  return true;
 }

const fetchRestrictionIds = async () => {
  console.log("Restrictions sélectionnées avant envoi:", selectedRestrictions.value);
  
  try {
    const response = await fetch('/api/user/restriction', {
      method: 'POST',
      body: JSON.stringify({ restrictions: selectedRestrictions.value }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log("Réponse de l'API restrictions:", data);

    if (data.success) {
      return data.data;
    } else {
      console.error('Erreur lors de la récupération des ID des restrictions :', data.message);
      return [];
    }
  } catch (error) {
    console.error('Erreur API restrictions:', error);
    return [];
  }
};

const updateUserData = async () => {
  props.userData.age = age.value;
  props.userData.sexe = selectedOption.value[1];
  props.userData.taille = height.value;
  props.userData.poids = weight.value;
  props.userData.imc = 1; 

  props.userData.restrictionsIds = await fetchRestrictionIds();
  console.log("Mise à jour de userData avec les restrictions:", props.userData);
};

const submitAnswers = () => {
  if (validateInputs()) {
    await updateUserData();
    emit('submitQuestionnaire');
  }
};

const nextQuestion = () => {
  if (validateInputs()) {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++;
    }
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
  if (isNextEnabled.value) {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      nextQuestion();
    } else {
      submitAnswers();
    }
  } else {
    validateInputs();
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
.question-box {
  background-color: white;
  padding: 5vh;
  margin-left: 28vw;
  border-radius: 1vh;
  box-shadow: 0 0 1vh 0.5vh rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 30vw;
}

.questionnaire-title {
  text-align: center;
  font-size: 4em;
  color: #333;
  margin-bottom: 1em;
  margin-left: 3em;
}

.questionnaire-container {
  margin: 50px auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.progress-info {
  font-size: 1em;
  color: #555;
}

.option {
  margin: 0.5em 0;
}

.error {
  color: red;
  font-size: 1.5vh;
  margin-top: 0.5vh;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 1em auto;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.align-right {
  margin-left: auto;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 1.5vh 3vw;
  border: none;
  border-radius: 1vw;
  font-size: 1.5vh;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.previous-button,
.next-button {
  background-color: #007BFF;
  color: white;
  padding: 1.5vh 3vw;
  border: none;
  border-radius: 1vw;
  font-size: 0.8em;
}
</style>
