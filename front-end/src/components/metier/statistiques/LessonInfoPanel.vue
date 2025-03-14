<script setup>
defineProps({
  lesson: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="space-y-4 p-6">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">Informations de la leçon</h2>
    <div class="space-y-4">
      <div>
        <p class="text-gray-600 mb-2 dark:text-gray-300">
          <i class="fas fa-info-circle mr-2"></i>
          <span class="font-medium">Description:</span> 
          <span class="block mt-1 pl-6">{{ lesson.lessonInfo.description }}</span>
        </p>
      </div>
      <div>
        <p class="text-gray-600 dark:text-gray-300">
          <i class="fas fa-code mr-2"></i>
          <span class="font-medium">Type:</span> {{ lesson.lessonInfo.type }}
        </p>
      </div>
      <div>
        <p class="text-gray-600 dark:text-gray-300">
          <i class="fas fa-tasks mr-2"></i>
          <span class="font-medium">Nombre d'exercices:</span> 
          {{ lesson.lessonInfo.content.filter(c => c.type === 'code').length }}
        </p>
      </div>
      <div>
        <p class="text-gray-600 dark:text-gray-300">
          <i class="fas fa-calendar-alt mr-2"></i>
          <span class="font-medium">Dernière mise à jour:</span> {{ lesson.lessonInfo.date_update }}
        </p>
      </div>
      <div>
        <p class="text-gray-600 dark:text-gray-300">
          <i class="fas fa-id-card mr-2"></i>
          <span class="font-medium">ID de la leçon:</span>
          <span class="block mt-1 pl-6 text-sm">{{ lesson.lessonInfo.id }}</span>
        </p>
      </div>
    </div>
  </div>
</template>