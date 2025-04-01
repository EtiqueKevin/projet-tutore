<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const props = defineProps({
  titre: String,
  questions: Array
});
const route = useRoute();

const currentQuestionIndex = ref(0);
const userAnswers = ref([]);
const showScore = ref(false);
const score = ref(0);
const answerSubmitted = ref(false);
const selectedAnswerIndex = ref(null);

const currentQuestion = computed(() => {
  return props.questions[currentQuestionIndex.value];
});

const handleAnswer = (answer, index) => {
  selectedAnswerIndex.value = index;
  answerSubmitted.value = true;
  
  if (index == currentQuestion.value.correctAnswer) {
    score.value++;
  }
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < props.questions.length - 1) {
    currentQuestionIndex.value++;
    answerSubmitted.value = false;
    selectedAnswerIndex.value = null;
  } else {
    showScore.value = true;
  }
};

const resetQuiz = () => {
  currentQuestionIndex.value = 0;
  userAnswers.value = [];
  showScore.value = false;
  score.value = 0;
  answerSubmitted.value = false;
  selectedAnswerIndex.value = null;
};

onMounted(() => {
  resetQuiz();
});

</script>

<template>
  <main class="p-5 flex-grow flex justify-center relative">
    <div class="min-w-96 bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-2xl font-bold mb-6 text-center">{{ titre }}</h1>

      <div v-if="!showScore" class="mt-5">
        <div class="flex justify-between items-center mb-6 flex-col">
          <h2 class="text-xl font-semibold">Question {{ currentQuestionIndex + 1 }} / {{ questions.length }}</h2>
          <span class="text-lg font-medium">Score: {{ score }}</span>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <p class="text-lg font-medium">{{ currentQuestion.question }}</p>
        </div>
        
        <div class="grid gap-4">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="handleAnswer(option, index)"
            :disabled="answerSubmitted"
            :class="[
              'py-4 px-6 text-left text-lg border-2 rounded-lg transition-all duration-300',
              answerSubmitted ? (
                index == currentQuestion.correctAnswer 
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : index == selectedAnswerIndex
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : 'bg-white border-gray-300'
              ) : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            ]"
          >
            {{ option }}
          </button>
        </div>

        <div class="mt-6 flex justify-between items-center flex-col">
          <div v-if="answerSubmitted" class="text-lg">
            <span v-if="selectedAnswerIndex == currentQuestion.correctAnswer" class="text-green-600">
              <i class="fas fa-check-circle"></i>
              Bonne réponse!
            </span>
            <span v-else class="text-red-600">
              <i class="fas fa-times-circle"></i>
              La bonne réponse était: {{ currentQuestion.options[currentQuestion.correctAnswer] }}
            </span>
          </div>
          
          <button 
            v-if="answerSubmitted"
            @click="nextQuestion"
            class="py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            {{ currentQuestionIndex === questions.length - 1 ? 'Voir le résultat' : 'Question suivante' }}
          </button>
        </div>
      </div>

      <div v-else class="text-center mt-5">
        <h2 class="text-2xl font-bold mb-4">Quiz terminé!</h2>
        <p class="text-lg mb-2">Votre score final:</p>
        <p class="text-4xl font-bold text-blue-600 mb-6">{{ score }} / {{ questions.length }}</p>
        <button 
          @click="resetQuiz" 
          class="py-3 px-6 text-base bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Recommencer le quiz
        </button>
      </div>
    </div>

    <RouterLink
          :to="{name: 'lesson-by-id', params: {id: route.params.id}}"
          class="text-primary-dark dark:text-primary-light flex items-center gap-2 m-2 hover:scale-105 transition-transform absolute top-5 left-5"
          title="Retour à la leçon"
        >
          <i class="fas fa-arrow-left"></i> Retour à la leçon
        </RouterLink>
  </main>
</template>