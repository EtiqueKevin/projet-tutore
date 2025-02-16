<script setup>
import { useStudentStore } from '@/stores/student';
import { marked } from 'marked';
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/structure/buttons/Button.vue';
import { onMounted, ref } from 'vue';

const studentStr = useStudentStore();
const route = useRoute();
const router = useRouter();
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
        //await new Promise(resolve => setTimeout(resolve, 1000))
        await studentStr.loadCours(route.params.id);
        cours.value = studentStr.currentCours;
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
<main class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="isLoading" class="max-w-4xl mx-auto">
            <!-- Header skeleton -->
            <div class="mb-8">
                <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-4 animate-pulse"></div>
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 animate-pulse"></div>
            </div>

            <!-- Content skeleton -->
            <div class="space-y-8">
                <div v-for="n in 3" :key="n" 
                     class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <!-- Text content skeleton -->
                    <div class="space-y-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
                    </div>
                    <!-- Exercise button skeleton -->
                    <div class="mt-6">
                        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                    </div>
                </div>
            </div>
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
                    
                    <div v-else-if="item.type === 'code'"
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