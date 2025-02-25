<script setup>
import { useRouter } from 'vue-router'
import Lesson from '@/components/metier/cours/Lesson.vue'   ;

const router = useRouter()

defineProps({
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
</script>

<template>
    <div class="bg-white dark:bg-background-dark shadow rounded-lg p-6">
        <!-- Skeleton loader -->
        <div v-if="isLoading">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-40 mb-6 animate-pulse"></div>
            <div class="space-y-4">
                <div v-for="n in 3" :key="n" 
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
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
        <h2 class="text-xl font-semibold mb-4 text-black dark:text-white">
            Leçons ({{ module.lessonCount }})
        </h2>
        
        <div class="space-y-4">
            <template v-for="lesson in module.lessons">
                <Lesson 
                :lesson="lesson"
                :is-logged-in="isUserLogged"
                :is-teacher="isTeacher"
                />
            </template>
        </div>
        
        <!-- Vide -->
        <div v-if="!module.lessons.length" 
        class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">Aucunes leçon disponible pour ce module.</p>
    </div>
        </div>
    </div>
</template>