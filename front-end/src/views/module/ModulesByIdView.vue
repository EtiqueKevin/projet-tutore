<script setup>
import { useRoute } from 'vue-router'
import { useStudentStore } from '@/stores/student';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

const studentStore = useStudentStore()
const userStore = useUserStore()
const route = useRoute()

onMounted(async () => {
    try {
        await studentStore.loadModule(route.params.id)
    } catch (error) {
        console.error('Failed to fetch module:', error)
    }
})
</script>

<template>
    <main class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="bg-background-light dark:bg-background-dark shadow rounded-lg p-6 mb-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h1 class="text-3xl font-bold mb-2 text-black dark:text-white">
                            {{ studentStore.getCurrentModule.name }}
                        </h1>
                        <p class="text-gray-600 mb-4 text-gray-500 dark:text-gray-400">
                            {{ studentStore.getCurrentModule.description }}
                        </p>
                    </div>
                    <div class="text-right text-black dark:text-white">
                        <p class="text-sm">
                            Mis à jour le : {{ new Date(studentStore.getCurrentModule.lastUpdate).toLocaleDateString() }}
                        </p>
                        <p class="text-sm">
                            Crée par: {{ studentStore.getCurrentModule.creator }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-background-light dark:bg-background-dark shadow rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-4 text-black dark:text-white">
                    Leçons ({{ studentStore.getCurrentModule.lessonCount }})
                </h2>
                
                <div class="space-y-4">
                    <div v-for="lesson in studentStore.getCurrentModule.lessons" 
                         :key="lesson.id"
                         class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md">
                        <div class="flex justify-between items-start gap-4">
                            <div class="space-y-2">
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
                            <button 
                                :class="[
                                    'px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2',
                                    userStore.isLogged 
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                        : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                                ]"
                                @click="$router.push({ name: 'lesson-by-id', params: { id: lesson.id } })"
                            >
                                <span>{{ userStore.isLogged ? 'Commencer la leçon' : 'Se connecter' }}</span>
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty -->
                <div v-if="!studentStore.getCurrentModule.lessons.length" 
                     class="text-center py-8">
                    <p class="text-gray-500 dark:text-gray-400">Aucunes leçon disponible pour ce module.</p>
                </div>
            </div>
        </div>
    </main>
</template>