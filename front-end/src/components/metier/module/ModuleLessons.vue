<script setup>
import { useRouter } from 'vue-router'
import Lesson from '@/components/metier/cours/Lesson.vue'
import { useLessonStore } from '@/stores/lesson'
import { useTeacher } from '@/composables/teacher'
import { useToast } from 'vue-toastification'

const { deleteLesson } = useTeacher()
const lessonStore = useLessonStore()
const router = useRouter()
const toast = useToast()
const emit = defineEmits(['refresh'])

const props = defineProps({ 
    isLoading: {
        type: Boolean,
        required: true
    },
    module: {
        type: Object,
        required: true
    },
    isUserLogged: {
        type: Boolean,
        required: true
    },
    isTeacher: {
        type: Boolean,
        required: false,
        default: false
    }
})

const createLesson = () => {
    lessonStore.clearCurrentLesson()
    lessonStore.setModuleId(props.module.id)
    router.push({ name: 'teacher-lesson-create'})
}

const deleteLessonId = async (lessonId) => {
    if (confirm('Voulez-vous vraiment supprimer cette leçon ?')) {
        const success = await deleteLesson(props.module.id, lessonId);
        if (success) {
            toast.success('La leçon a été supprimée avec succès')
            emit('refresh')
        }else{
            toast.error('Une erreur est survenue lors de la suppression de la leçon')
        }
    }
}

const updateLesson = (lesson) => {
    lessonStore.clearCurrentLesson()
    lessonStore.setLesson(lesson, props.module.id)
    router.push({ name: 'teacher-lesson-create' })
}

</script>

<template>
    <div class="bg-white dark:bg-background-dark shadow rounded-lg p-6">
        <!-- Skeleton loader -->
        <div v-if="isLoading">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-40 mb-6 animate-pulse"></div>
            <div class="space-y-4">
                <div v-for="n in 3" :key="n" class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div class="flex justify-between items-start gap-4">
                        <div class="space-y-3 flex-1">
                            <div class="flex items-center gap-2">
                                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4 animate-pulse"></div>
                                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-16 animate-pulse"></div>
                            </div>
                            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-2/3 animate-pulse"></div>
                        </div>
                        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-32 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Contenu -->
        <div v-else>
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-black dark:text-white">
                    Leçons ({{ module.lessonCount }})
                </h2>
                <button
                    v-if="isTeacher"
                    @click="createLesson"
                    class="py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <i class="fas fa-plus mr-2"></i>
                    Ajouter une leçon
                </button>    
            </div>

            <div class="space-y-4">
                <template v-for="lesson in module.lessons">
                    <Lesson 
                        :lesson="lesson"
                        :is-logged-in="isUserLogged"
                        :is-teacher="isTeacher"
                        @delete="deleteLessonId(lesson.id)"
                        @update="updateLesson(lesson)"
                    />
                </template>
            </div>
            
            <!-- Vide -->
            <div v-if="!module.lessons.length" class="text-center py-8">
                <p class="text-gray-500 dark:text-gray-400">Aucunes leçon disponible pour ce module.</p>
            </div>
        </div>
    </div>
</template>
