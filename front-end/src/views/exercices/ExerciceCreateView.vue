<script setup>
import Console from '@/components/metier/exercice/Console.vue';
import Editor from '@/components/metier/exercice/teacher/TeacherEditor.vue';
import MarkdownArea from '@/components/metier/exercice/MarkdownArea.vue';
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  sujet: String,
  files: Array
});

// 0 = sujet, 1 = editor, 2 = console
const page = ref(0);
const sujet = ref(null);
const exercicefiles = ref([]);

const consoleResults = ref('');
const isWriting = ref(true);

const emit = defineEmits(['save', 'cancel']);

const saveExercice = () => {
  if (!sujet.value) {
  window.alert('Le sujet de l\'exercice ne peut pas être vide');
    return;
  }

  if (exercicefiles.value.length === 0) {
    window.alert('Vous devez ajouter des fichiers à l\'exercice');
    return;
  }

  const hasTestFile = exercicefiles.value.some(file => file.type === 'test');
  const hasFile = exercicefiles.value.some(file => file.type === 'file');

  if (!hasTestFile || !hasFile) {
    window.alert('Vous devez ajouter au moins un fichier de type "test" et un fichier de type "file"');
    return;
  }

  emit('save', {
    type: 'code',
    content: sujet.value,
    files: exercicefiles.value,
  });
};

const cancel = () => {
  emit('cancel');
};

onMounted(() => {
  sujet.value = props.sujet;
  exercicefiles.value = props.files;
});
const isMobile = computed(() => window.innerWidth < 768);
</script>

<template>
  <main :class="['flex-grow flex', isMobile ? 'flex-col' : '']">
      <div v-if="isMobile" class="flex justify-around border-b-2">
        <button @click="page=0" :class="['button-mobile', page==0?'selected':'']">Markdown</button>
        <button @click="page=1" :class="['button-mobile', page==1?'selected':'']">Editor</button>
        <button @click="page=2" :class="['button-mobile', page==2?'selected':'']">Console</button>
      </div>
      <div class="flex flex-col w-[20%] border-r-2 dark:border-gray-300 border-slate-800" v-if="!isMobile || page === 0">
          <div class="flex p-2 pt-0 gap-2 border-b-2 dark:border-gray-300 border-slate-800">
              <button @click="isWriting = true"  :class="['button', isWriting ? 'selected' : '']">Sujet</button>
              <button @click="isWriting = false" :class="['button', !isWriting ? 'selected' : '']">Markdown</button>
          </div>
          <textarea v-if="isWriting" v-model="sujet" class="flex-1 p-2 dark:bg-main-dark dark:text-white" placeholder="Ecrire le sujet de l'éxercice ici"></textarea>
          <MarkdownArea v-else :markdown-text="sujet" class="flex-1"/>
          <div class="flex p-2 gap-2 border-t-2 dark:border-gray-300 border-slate-800">
            <button @click="saveExercice" class="menu-button">Valider Exercice</button>
            <button @click="cancel" class="menu-button">Annuler</button>
          </div>
      </div>
      <Editor :files="exercicefiles" class="w-[60%] border-r-2 dark:border-gray-300 border-slate-800" v-if="!isMobile || page === 1"/>
      <Console :results="consoleResults" class="w-[20%]" v-if="!isMobile || page === 2"/>
  </main>
  </template>

<style scoped>
.button {
    @apply px-4 py-2 rounded-b-lg transition-colors bg-gray-800 text-white border-none cursor-pointer flex gap-2 bg-gray-500 dark:bg-gray-700;
}
.button.selected {
    @apply bg-primary-dark text-white;
}

.menu-button {
  @apply px-4 py-2 cursor-pointer bg-primary-dark hover:bg-primary-light rounded text-white;
}

.button-mobile {
  @apply px-4 py-2 bg-primary-dark text-white flex-1;
}

.button-mobile.selected {
  @apply bg-primary-light;
}
</style>