<script setup>
import Console from '@/components/editor/Console.vue';
import Editor from '@/components/editor/student/ExerciceEditor.vue';
import MarkdownArea from '@/components/editor/MarkdownArea.vue';
import { ref, computed } from 'vue'

// 0 = sujet, 1 = editor, 2 = console
const page = ref(0);

const sujet = ref(`# Exercice 1

## Objectif

Écrire une fonction qui prend en paramètre un tableau de nombres et qui retourne la somme de ces nombres.

## Exemple

\`\`\`javascript

sum([1, 2, 3, 4, 5]); // 15

\`\`\`

## Contraintes

- La fonction doit retourner un nombre

- La fonction doit retourner la somme des nombres du tableau

`);
const files = ref([
  { name: 'Example.java', content: 'public class Example {}', language: 'java' },
  { name: 'script.js', content: 'console.log("Hello, world!");', language: 'javascript' }
]);
const console = ref(``);

const isMobile = computed(() => window.innerWidth < 768);
</script>

<template>
<main :class="['flex-grow flex', isMobile ? 'flex-col' : '']">
    <div v-if="isMobile" class="flex justify-around border-b-2">
      <button @click="page=0" :class="['button-mobile', page==0?'selected':'']">Markdown</button>
      <button @click="page=1" :class="['button-mobile', page==1?'selected':'']">Editor</button>
      <button @click="page=2" :class="['button-mobile', page==2?'selected':'']">Console</button>
    </div>
    <MarkdownArea v-if="!isMobile || page === 0" :markdown-text="sujet" class="dark:border-gray-300 border-slate-800" :class="isMobile ? 'max-w-none flex-grow' : 'border-r-2'"/>
    <Editor v-if="!isMobile || page === 1" :files="files" class="dark:border-gray-300 border-slate-800" :class="isMobile ? 'max-w-none flex-grow' : 'border-r-2'"/>
    <Console v-if="!isMobile || page === 2" :results="console" class="flex-1" :class="isMobile ? 'w-full' : ''"/>
</main>
</template>

<style scoped>
.button-mobile {
  @apply px-4 py-2 bg-primary-dark text-white flex-1;
}

.button-mobile.selected {
  @apply bg-primary-light;
}
</style>