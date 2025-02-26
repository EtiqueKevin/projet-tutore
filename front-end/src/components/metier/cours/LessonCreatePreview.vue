<script setup>
import { useTools } from '@/composables/tools';
import Button from '@/components/structure/buttons/Button.vue';

const { toMarkdown, cleanMarkdown } = useTools();

const props = defineProps({
  cours: Object
});

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
  if (!props.cours.content) return [];
  
  const toc = [];
  let textCounter = 1;
  let exerciseCounter = 1;
  
  props.cours.content.forEach(item => {
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
</script>

<template>
  <div class="p-4">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ cours.title }}
      </h1>
      <p class="text-lg text-gray-700 dark:text-gray-300">
        {{ cours.description }}
      </p>
    </header>
    
    <!-- Sommaire -->
    <div class="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 mb-8">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
        Table des matières
      </h2>
      <ul class="space-y-1.5 max-w-2xl">
        <li v-for="item in generateTableOfContents()" 
        :key="item.index"
        @click="scrollToSection(item.index)"
        class="flex items-center gap-2 cursor-pointer p-1.5 rounded text-sm hover:border-b-2 hover:border-black dark:hover:border-white">
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
    class="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6 scroll-mt-8">
    <div v-if="item.type === 'text'" 
    class="prose dark:prose-invert max-w-none"
    v-html="toMarkdown(item.content)">
  </div>
  <div v-else-if="item.type === 'code'" class="flex justify-center sm:justify-start">
    <Button class="bg-blue-600 hover:bg-white text-white hover:text-blue-600 border border-blue-600 hover:border-blue-600 flex items-center gap-2 p-2 rounded-lg transition-colors duration-200">
      <span>Faire l'exercice</span>
      <i class="fas fa-arrow-right"></i>
    </Button>
  </div>
</article>
</div>
</div>
</template>