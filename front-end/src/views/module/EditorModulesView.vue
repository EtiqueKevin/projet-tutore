<script setup>
import { ref, onMounted } from 'vue'
import { useStudent } from '@/composables/student'
import Modal from '@/components/structure/Modal.vue'
import CreateModuleForm from '@/components/structure/forms/CreateModuleForm.vue'
import Module from '@/components/metier/module/Module.vue'
import { useTeacher } from '@/composables/teacher'
import { useToast } from 'vue-toastification'
import { useLessonStore } from '@/stores/lesson'
import { useRouter } from 'vue-router'


const router = useRouter()

// imports
const lessonStore = useLessonStore()
const { deleteModule, getModuleUser } = useTeacher()
const toast = useToast()

// variables
const modules = ref([])
const loading = ref(true)
const modal = ref(false)
const modifModule = ref(null)

onMounted(async () => {
  await reload()
})

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

    modules.value = await getModuleUser()
  } catch (error) {
    console.error('Failed to fetch modules:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="px-4 py-8 min-h-screen w-full ">
    <div class="flex space-x-4 items-center mb-4">
      <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">Vos Modules</h1>
      <button 
            title="Ajouter un module" 
            class="text-primary-dark dark:text-primary-light hover:underline"
            @click="openModule(null)"
          >
            <i class="fas fa-plus"></i>
            Ajouter un module
          </button>
    </div>


    <div v-if="lessonStore.isInit" class="flex space-x-4 items-center bg-yellow-300 dark:bg-yellow-500 p-4 rounded-lg mb-4">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Vous avez une lesson en cours d'édition</p>
      <button @click="router.push({ name: 'teacher-lesson-create'})" class="hover:underline">
        Reprendre l'édition
        <i class="fas fa-arrow-right"></i>
      </button>
      <button  @click="lessonStore.clearCurrentLesson()" class="hover:underline border-l-2 border-black pl-4">
        Abandonner l'édition
        <i class="fas fa-trash"></i>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
        <template v-for="module in modules" >
          <Module :module="module" :canUpdate="true" @delete="deleteModuleId(module.id)" @open="openModule(module)"/>
        </template> 
      </template>
    </div>
  </main>

  <Modal  v-if="modal" @close="modal = false">
    <CreateModuleForm @quitter="reload" :module="modifModule"/>
  </Modal>

</template>