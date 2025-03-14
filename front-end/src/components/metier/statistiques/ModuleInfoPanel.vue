<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps({
  moduleInfo: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="space-y-4 p-6">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">Informations du module</h2>
    <div class="space-y-4">
      <div>
        <p class="text-gray-600 mb-2 dark:text-gray-300">
          <i class="fas fa-info-circle mr-2"></i>
          <span class="font-medium">Description:</span> 
          <span class="block mt-1 pl-6">{{ moduleInfo.description }}</span>
        </p>
      </div>
      <div>
        <p class="text-gray-600 dark:text-gray-300">
          <i class="fas fa-book mr-2"></i>
          <span class="font-medium">Nombre de leçons:</span> {{ moduleInfo.nblesson }}
        </p>
      </div>
      <div>
        <p class="text-gray-600 dark:text-gray-300">
          <i class="fas fa-calendar-alt mr-2"></i>
          <span class="font-medium">Dernière mise à jour:</span> {{ moduleInfo.dateupdate }}
        </p>
      </div>
      <div>
        <p class="text-gray-600 dark:text-gray-300">
          <i class="fas fa-id-card mr-2"></i>
          <span class="font-medium">ID du module:</span>
          <span class="block mt-1 pl-6 text-sm">{{ moduleInfo.id }}</span>
        </p>
      </div>
      <button 
        @click="router.push(`/teacher/modules/${moduleInfo.id}`)"  
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        title="Voir le module"
      >
        <i class="fas fa-eye mr-2"></i>
        Voir le module
      </button>
    </div>
  </div>
</template>