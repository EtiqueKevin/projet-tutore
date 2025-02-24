<script setup>
import { ref, onMounted } from 'vue'
import { useStudent } from '@/composables/student'
import { useRouter } from 'vue-router'
import Modal from '@/components/structure/Modal.vue'
import CreateModuleForm from '@/components/structure/forms/CreateModuleForm.vue'
import { useTeacher } from '@/composables/teacher'
import { useToast } from 'vue-toastification'

const { getModules } = useStudent()
const { deleteModule } = useTeacher()
const toast = useToast()
const router = useRouter()
const modules = ref([])
const loading = ref(true)
const modal = ref(false)
const modifModule = ref(null)

onMounted(async () => {
  await reload()
})

const viewModule = (moduleId) => {
  router.push(`/modules/${moduleId}`)
}

const deleteModuleId = async (moduleId) => {
  try {
    const success = await deleteModule(moduleId)
    if (success) {
      await reload()
      toast.success('Module supprimé avec succès')
    }else{
      toast.error('Erreur lors de la suppression du module')
    }
  } catch (error) {
    console.error('Failed to delete module:', error)
  }
}

const openModule = (module) => {
  modifModule.value = module
  modal.value = true 
}

const reload = async () => {
  try {
    loading.value = true
    modal.value = false

    modules.value = await getModules()
  } catch (error) {
    console.error('Failed to fetch modules:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (timestamp) => {
  return new Date(parseInt(timestamp)).toLocaleDateString()
}
</script>

<template>
  <main class="px-4 py-8 min-h-screen w-full ">
    <h1 class="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Votre Modules</h1>
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
      <template v-else>
        <div v-for="module in modules" 
             :key="module.id" 
             class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg border border-gray-200 dark:border-gray-700">
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
            <div class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700 space-x-4">
              <button 
                @click="viewModule(module.id)"
                class="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2"
              >
                <i class="fas fa-eye"></i>
                Voir le module
              </button>
              <button
                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2"
                @click="openModule(module)"
              >
                <i class="fas fa-pencil"></i>
                Modifier
            </button>
              <button
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2"
                @click="deleteModuleId(module.id)"
              >
                <i class="fas fa-trash"></i>
                Supprimer
            </button>
            </div>
          </div>
        </div>
          <button 
            title="Ajouter un module" 
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg border border-gray-200 dark:border-gray-700 text-black dark:text-white text-2xl"
            @click="openModule(null)"
          >
            <i class="fas fa-plus"></i>
            Ajouter un module
          </button>
      </template>
    </div>
  </main>

  <Modal  v-if="modal" @close="modal = false">
    <CreateModuleForm @quitter="reload" :module="modifModule"/>
  </Modal>

</template>