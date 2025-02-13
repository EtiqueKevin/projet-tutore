<script setup>
import { ref, onMounted } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useRouter } from 'vue-router'

const studentStore = useStudentStore()
const router = useRouter()
const modules = ref([])

onMounted(async () => {
  try {
    modules.value = await studentStore.getModules()
  } catch (error) {
    console.error('Failed to fetch modules:', error)
  }
})

const viewModule = (moduleId) => {
  router.push(`/modules/${moduleId}`)
}

const formatDate = (timestamp) => {
  return new Date(parseInt(timestamp)).toLocaleDateString()
}
</script>

<template>
  <main class="container px-4 py-8 min-h-screen">
    <h1 class="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Modules</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="module in modules" 
           :key="module.id" 
           class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ module.name }}</h2>
          <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
            {{ module.nblesson }} leçons
          </span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ module.description }}</p>
        <div class="flex flex-col space-y-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Mis à jour le : {{ formatDate(module.dateupdate) }}
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              @click="viewModule(module.id)"
              class="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <i class="fas fa-eye"></i>
              Consulter le module
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>