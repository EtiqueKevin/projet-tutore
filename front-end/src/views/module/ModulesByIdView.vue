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
                        <p class="text-sm ">
                            Mis à jour le : {{ new Date(studentStore.getCurrentModule.lastUpdate).toLocaleDateString() }}
                        </p>
                        <p class="text-sm ">
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
                         class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div class="flex justify-between items-center">
                            <div>
                                <h3 class="text-lg font-medium ">
                                    {{ lesson.title }}
                                </h3>
                                <p class="">
                                    {{ lesson.description }}
                                </p>
                            </div>
                            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" v-if="userStore.isLogged">
                                Commencer la leçon
                            </button>
                            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" v-else>
                                Se connecter pour voir la leçon
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="!studentStore.getCurrentModule.lessons.length" 
                     class="text-center py-8">
                    <p class="text-gray-500 dark:text-gray-400">Aucunes leçon disponible pour ce module.</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>