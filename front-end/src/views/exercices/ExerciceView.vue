<script setup>
import Console from '@/components/editor/Console.vue';
import Editor from '@/components/editor/student/ExerciceEditor.vue';
import MarkdownArea from '@/components/editor/MarkdownArea.vue';
import { ref, computed, onMounted } from 'vue'
import { useStudentStore } from '@/stores/student';
import { useRouter } from 'vue-router';

// 0 = sujet, 1 = editor, 2 = console
const page = ref(0);
const studentStr = useStudentStore();
const router = useRouter();

const sujet = ref("");
const files = ref([]);
const consoleText = ref(``);

const isMobile = computed(() => window.innerWidth < 768);
const isLoaded = computed(() => sujet.value !== "" && files.value.length > 0);

onMounted(() => {
  if (!studentStr.isExerciceLoaded) {
    router.push({ name: 'cours' });
    return;
  }

  const currentExercice = studentStr.currentExercice;
  sujet.value = currentExercice.statement;
  files.value = currentExercice.files.filter(file => file.type === 'file');
});
</script>

<template>
<main :class="['flex-grow flex', isMobile ? 'flex-col' : '']" v-if="isLoaded">
    <div v-if="isMobile" class="flex justify-around border-b-2">
      <button @click="page=0" :class="['button-mobile', page==0?'selected':'']">Markdown</button>
      <button @click="page=1" :class="['button-mobile', page==1?'selected':'']">Editor</button>
      <button @click="page=2" :class="['button-mobile', page==2?'selected':'']">Console</button>
    </div>
    <MarkdownArea v-if="!isMobile || page === 0" :markdown-text="sujet" class="dark:border-gray-300 border-slate-800" :class="isMobile ? 'max-w-none flex-grow' : 'border-r-2'"/>
    <Editor v-if="!isMobile || page === 1" :files="files" class="dark:border-gray-300 border-slate-800" :class="isMobile ? 'max-w-none flex-grow' : 'border-r-2'"/>
    <Console v-if="!isMobile || page === 2" :results="consoleText" class="flex-1" :class="isMobile ? 'w-full' : ''"/>
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