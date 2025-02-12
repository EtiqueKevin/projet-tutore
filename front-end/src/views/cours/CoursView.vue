<script setup>
import { useStudentStore } from '@/stores/student';
import { marked } from 'marked';
import router from '@/router';
import Button from '@/components/buttons/Button.vue';
import { onMounted, ref } from 'vue';

const studentStr = useStudentStore();
const cours = ref(null);
const isLoading = ref(true);

const toMarkdown = (content) => {
    return marked(content);
};

const navigateToExercise = (exerciceData) => {
    studentStr.setCurrentExercice(exerciceData);
    router.push({ name: 'exercice' });
};

onMounted(async () => {
    try {
        await studentStr.loadCours(1);
        cours.value = studentStr.currentCours;
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <main class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center items-center min-h-[60vh]">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <!-- Error state -->
        <div v-else-if="!cours" class="text-center py-12">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                Impossible de charger le cours
            </h2>
            <Button @click="studentStr.loadCours(1)" class="mt-4">
                Réessayer
            </Button>
        </div>

        <!-- Content -->
        <div v-else class="max-w-4xl mx-auto">
            <header class="mb-8">
                <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {{ cours.title }}
                </h1>
                <p class="text-lg text-gray-700 dark:text-gray-300">
                    {{ cours.description }}
                </p>
            </header>

            <div class="space-y-8">
                <article v-for="(item, index) in cours.content" 
                        :key="`${item.type}-${index}`"
                        class="bg-background-light dark:bg-background-dark rounded-lg shadow-sm p-6 
                               transition-all duration-200 hover:shadow-md">
                    <div v-if="item.type === 'text'" 
                         class="prose dark:prose-invert max-w-none"
                         v-html="toMarkdown(item.content)">
                    </div>
                    
                    <div v-else-if="item.type === 'exercice'"
                         class="flex justify-center sm:justify-start">
                        <Button @click="navigateToExercise(item)"
                                class="bg-blue-600 hover:bg-white
                                        text-white hover:text-blue-600
                                        border border-blue-600 hover:border-blue-600
                                        flex items-center gap-2">
                            <span>Faire l'exercice</span>
                            <i class="fas fa-arrow-right"></i>
                        </Button>
                    </div>
                </article>
            </div>
        </div>
    </main>
</template>