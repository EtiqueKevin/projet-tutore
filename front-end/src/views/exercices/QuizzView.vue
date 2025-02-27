<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  titre: String,
  questions: Array
});

const currentQuestionIndex = ref(0);
const userAnswers = ref([]);
const showScore = ref(false);
const score = ref(0);

const currentQuestion = computed(() => {
  return props.questions[currentQuestionIndex.value];
});

const handleAnswer = (selectedAnswer) => {
  userAnswers.value.push(selectedAnswer);
  
  if (selectedAnswer === currentQuestion.value.correctAnswer) {
    score.value++;
  }

  if (currentQuestionIndex.value < props.questions.length - 1) {
    currentQuestionIndex.value++;
  } else {
    showScore.value = true;
  }
};

const resetQuiz = () => {
  currentQuestionIndex.value = 0;
  userAnswers.value = [];
  showScore.value = false;
  score.value = 0;
};

onMounted(() => {
  resetQuiz();
});
</script>

<template>
  <main class="max-w-3xl mx-auto p-5 flex-grow">
    <h1 class="text-2xl font-bold mb-6">{{ titre }}</h1>

    <div v-if="!showScore" class="mt-5">
      <h2 class="text-xl mb-4">Question {{ currentQuestionIndex + 1 }} / {{ questions.length }}</h2>
      <p class="text-lg mb-6">{{ currentQuestion.question }}</p>
      
      <div class="flex flex-col space-y-3">
        <button
          v-for="option in currentQuestion.options"
          :key="option"
          @click="handleAnswer(option)"
          class="py-3 px-6 text-base border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-100 hover:border-gray-600 transition-all duration-300"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <h2 class="text-2xl font-bold mb-4">Quiz terminé!</h2>
      <p class="text-lg mb-6">Votre score: {{ score }} / {{ questions.length }}</p>
      <button 
        @click="resetQuiz" 
        class="py-3 px-6 text-base bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
      >
        Recommencer
      </button>
    </div>
  </main>
</template>