<script setup>
import { ref, onMounted } from 'vue'
import { useStudent } from '@/composables/student'
import Module from '@/components/metier/module/Module.vue'

const { getModules } = useStudent()
const modules = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    //await new Promise(resolve => setTimeout(resolve, 1000))
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