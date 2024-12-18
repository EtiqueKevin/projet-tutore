<script setup>
import Console from '@/components/editor/Console.vue';
import Editor from '@/components/editor/student/ExerciceEditor.vue';
import MarkdownArea from '@/components/editor/MarkdownArea.vue';
import { ref } from 'vue'

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

</script>

<template>
<main class="flex-grow flex">
    <MarkdownArea :markdown-text="sujet" class="flex-1 border-r-2 dark:border-gray-300 border-slate-800"/>
    <Editor :files="files" class="flex-2 border-r-2 dark:border-gray-300 border-slate-800"/>
    <Console :results="console" class="flex-1"/>
</main>
</template>