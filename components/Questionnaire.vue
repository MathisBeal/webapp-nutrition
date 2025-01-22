<template>
    <div class="questionnaire-container">
      <div class="question-box">
        <h2>{{ questions[currentQuestionIndex].question }}</h2>
        <form>
          <div v-for="(option, index) in questions[currentQuestionIndex].options" :key="index" class="option">
            <input 
              type="radio" 
              :id="'option-' + index" 
              name="question" 
              :value="option" 
              v-model="selectedOption[currentQuestionIndex]" 
            />
            <label :for="'option-' + index">{{ option }}</label>
          </div>
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
            @click="nextQuestion" 
            class="next-button"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  
  const questions = ref([
    {
      question: 'Quelle est votre régime alimentaire ?',
      options: ['Général', 'Végétarien', 'Végan', 'Autre'],
    },
    {
      question: 'À quelle fréquence mangez-vous des fruits ?',
      options: ['Tous les jours', 'Quelques fois par semaine', 'Rarement', 'Jamais'],
    },
  ]);
  

  const selectedOption = ref<(string | null)[]>(questions.value.map(() => null));
  

  const currentQuestionIndex = ref(0);
  
 
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
  

  