<script setup>
import { computed } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  cours: Object
});

const previewContent = computed(() => {
  return props.cours.content.map(item => {
    if (item.type === 'text') {
      return marked(item.content);
    } else if (item.type === 'exercice') {
      return `<button class="w-full mb-4 p-2 border border-gray-400">Exercice</button>`;
    }
  }).join('');
});
</script>

<template>
  <div class="p-4 prose dark:prose-white">
    <h1>{{ cours.title }}</h1>
    <p>{{ cours.description }}</p>
    <div v-html="previewContent"></div>
  </div>
</template>