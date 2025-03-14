<script setup>
defineProps({
  exercise: {
    type: Object,
    required: true
  },
  exerciseContent: {
    type: Object,
    required: true
  },
  graph: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="space-y-4 p-6">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">Informations de l'exercice</h2>
    <div class="space-y-4">
      <div>
        <p class="text-gray-600 dark:text-gray-300 mb-2">
          <i class="fas fa-info-circle mr-2"></i>
          <span class="font-medium">Énoncé:</span> 
          <span class="block mt-1 pl-6 prose prose-sm dark:prose-invert" v-html="exerciseContent.content"></span>
        </p>
      </div>
      
      <div>
        <p class="text-gray-600 dark:text-gray-300 mb-2">
          <i class="fas fa-file-code mr-2"></i>
          <span class="font-medium">Fichiers:</span>
        </p>
        <div class="mt-2 pl-6 space-y-2">
          <div v-for="file in exerciseContent.files" 
               :key="file.filename"
               class="flex items-center text-gray-600 dark:text-gray-300">
            <i class="fas fa-file mr-2"></i>
            <span>{{ file.filename }}</span>
            <span class="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
              {{ file.type }}
            </span>
          </div>
        </div>
      </div>

      <div>
        <p class="text-gray-600 dark:text-gray-300">
          <i class="fas fa-exclamation-circle mr-2"></i>
          <span class="font-medium">Total des erreurs:</span>
          {{ graph.totalExerciseErrors(exercise) }}
        </p>
      </div>

      <div>
        <p class="text-gray-600 dark:text-gray-300 mb-2">
          <i class="fas fa-bug mr-2"></i>
          <span class="font-medium">Détail des erreurs:</span>
        </p>
        <div class="mt-2 pl-6 space-y-3">
          <div v-for="(functions, testName) in exercise.errors" 
               :key="testName"
               class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <p class="text-gray-700 dark:text-gray-200 font-medium mb-2">Test: {{ testName }}</p>
            <div class="space-y-1">
              <div v-for="(count, funcName) in functions" 
                   :key="funcName"
                   class="flex justify-between items-center pl-4 text-sm text-gray-600 dark:text-gray-300">
                <span>{{ funcName }}:</span>
                <span class="font-medium">{{ count }} erreurs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>