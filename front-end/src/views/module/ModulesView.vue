<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStudent } from '@/composables/student'
import Module from '@/components/metier/module/Module.vue'

const { getModules, searchModule } = useStudent()
const modules = ref([])
const loading = ref(true)
const searchName = ref('')
const searchDescription = ref('')

// Add debounce function to avoid too many API calls
const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Watch for changes in search inputs
watch([searchName, searchDescription], debounce(async ([name, description]) => {
  loading.value = true
  try {
    if (name || description) {
      modules.value = await searchModule(name, description)
    } else {
      modules.value = await getModules()
    }
  } catch (error) {
    console.error('Failed to search modules:', error)
  } finally {
    loading.value = false
  }
}, 300))

onMounted(async () => {
  try {
    modules.value = await getModules()
  } catch (error) {
    console.error('Failed to fetch modules:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="px-4 py-8 min-h-screen w-full">
    <h1 class="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Modules</h1>
    
    <!-- Search bars -->
    <div class="mb-6 flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <input
          v-model="searchName"
          type="text"
          placeholder="Recherche par titre..."
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <div class="flex-1">
        <input
          v-model="searchDescription"
          type="text"
          placeholder="Recherche par description..."
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Skeleton loader -->
      <template v-if="loading">
        <div v-for="n in 6" :key="n" 
             class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-start mb-4">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
          </div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4 animate-pulse"></div>
          <div class="flex flex-col space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/5 animate-pulse"></div>
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </template>

      <!-- Contenu -->
      <template v-else v-for="module in modules" >
        <Module :module="module" />
      </template>
    </div>
  </main>
</template>