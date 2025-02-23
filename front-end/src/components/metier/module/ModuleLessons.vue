<script setup>
import { useRouter } from 'vue-router'

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
    <div class="bg-background-light dark:bg-background-dark shadow rounded-lg p-6">
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
                <div v-for="lesson in module.lessons" 
                     :key="lesson.id"
                     class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-200 shadow-sm">
                    <div class="flex justify-between items-start gap-4">

                        <!-- informations -->
                        <div class="space-y-2 flex-grow">
                            <div class="flex items-center gap-2">
                                <h3 class="text-lg font-semibold text-black dark:text-white">
                                    {{ lesson.name }}
                                </h3>
                                <span class="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                                    Leçon {{ lesson.id }}
                                </span>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300">
                                {{ lesson.description }}
                            </p>
                        </div>

                        <!-- bouttons -->
                        <div class="flex items-center gap-2 flex-shrink-0">
                            <button 
                                v-if="isTeacher"
                                class="items-center gap-2 px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
                                title="Modifier la leçon"
                            >
                                <i class="fas fa-edit"></i>
                                <span>Modifier</span>
                            </button>
                            
                            <button 
                                :class="[
                                    'inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200',
                                    isUserLogged 
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                        : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                                ]"
                                @click="router.push({ name: 'lesson-by-id', params: { id: lesson.id } })"
                            >
                                <span class="hidden sm:inline">{{ isUserLogged ? 'Commencer la leçon' : 'Se connecter' }}</span>
                                <span class="sm:hidden">{{ isUserLogged ? 'Commencer' : 'Login' }}</span>
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Vide -->
            <div v-if="!module.lessons.length" 
                 class="text-center py-8">
                <p class="text-gray-500 dark:text-gray-400">Aucunes leçon disponible pour ce module.</p>
            </div>
        </div>
    </div>
</template>