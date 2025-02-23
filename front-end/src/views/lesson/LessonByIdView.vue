<script setup>
import { useStudent } from '@/composables/student'
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/structure/buttons/Button.vue';
import ReturnTopButton from '@/components/structure/buttons/ReturnTopButton.vue';
import { onMounted, ref } from 'vue';
import { useTools } from '@/composables/tools';

const { toMarkdown, cleanMarkdown } = useTools();
const { loadCours } = useStudent();
const route = useRoute();
const router = useRouter();
const cours = ref(null);
const isLoading = ref(true);

const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
        const offset = 50;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
};

const generateTableOfContents = () => {
    if (!cours.value?.content) return [];
    
    const toc = [];
    let textCounter = 1;
    let exerciseCounter = 1;
    
    cours.value.content.forEach(item => {
        if (item.type === 'text') {
            const cleanedContent = cleanMarkdown(item.content);
            const preview = cleanedContent.length > 50 
                ? cleanedContent.substring(0, 50) + '...' 
                : cleanedContent;
            toc.push({
                title: `Section ${textCounter}: ${preview}`,
                type: 'text',
                index: item.index
            });
            textCounter++;
        } else if (item.type === 'code') {
            toc.push({
                title: `Exercice ${exerciseCounter}`,
                type: 'code',
                index: item.index
            });
            exerciseCounter++;
        }
    });
    
    return toc;
};

const navigateToExercise = (idLesson, index) => {
    router.push({
        name:'exercice',
        params:{
            id:idLesson,
            nbContent:index
        }
    })
};

onMounted(async () => {
    try {
        //await new Promise(resolve => setTimeout(resolve, 2000))
        cours.value = await loadCours(route.params.id);
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <main class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <!-- Loading -->
        <div v-if="isLoading" class="max-w-4xl mx-auto">
            <!-- Header skeleton -->
            <div class="mb-8">
                <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-4 animate-pulse"></div>
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 animate-pulse"></div>
            </div>

            <!-- Content skeleton -->
            <div class="space-y-8">
                <div v-for="n in 3" :key="n" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <!-- Text skeleton -->
                    <div class="space-y-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
                    </div>
                    <!-- button skeleton -->
                    <div class="mt-6">
                        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contenu -->
        <div v-else class="max-w-4xl mx-auto">
            <header class="mb-8">
                <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {{ cours.title }}
                </h1>
                <p class="text-lg text-gray-700 dark:text-gray-300">
                    {{ cours.description }}
                </p>
            </header>

            <!-- Sommaire -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Table des matières
                </h2>
                <ul class="space-y-1.5 max-w-2xl">
                    <li v-for="item in generateTableOfContents()" 
                        :key="item.index"
                        @click="scrollToSection(item.index)"
                        class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1.5 rounded transition-colors duration-200 text-sm">
                        <span v-if="item.type === 'text'" class="text-gray-600 dark:text-gray-400 flex-shrink-0 w-5">
                            <i class="fas fa-book-open text-xs"></i>
                        </span>
                        <span v-else class="text-blue-600 dark:text-blue-400 flex-shrink-0 w-5">
                            <i class="fas fa-code text-xs"></i>
                        </span>
                        <span class="text-gray-700 dark:text-gray-300 truncate">
                            {{ item.type === 'text' ? item.title.split(':')[1].trim() : item.title }}
                        </span>
                    </li>
                </ul>
            </div>

            <!-- Contenu -->
            <div class="space-y-8">
                <article v-for="(item, index) in cours.content" 
                         :key="`${item.type}-${index}`"
                         :id="`section-${item.index}`"
                         class="bg-background-light dark:bg-background-dark rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md scroll-mt-8">
                    <div v-if="item.type === 'text'" 
                         class="prose dark:prose-invert max-w-none"
                         v-html="toMarkdown(item.content)">
                    </div>
                    <div v-else-if="item.type === 'code'" class="flex justify-center sm:justify-start">
                        <Button @click="navigateToExercise(cours.id, index)"
                               class="bg-blue-600 hover:bg-white text-white hover:text-blue-600 border border-blue-600 hover:border-blue-600 flex items-center gap-2">
                            <span>Faire l'exercice</span>
                            <i class="fas fa-arrow-right"></i>
                        </Button>
                    </div>
                </article>
            </div>
        </div>

        <ReturnTopButton />
    </main>
</template>
