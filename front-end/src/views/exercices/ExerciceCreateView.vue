<script setup>
import Console from '@/components/metier/exercice/Console.vue';
import Editor from '@/components/metier/exercice/teacher/TeacherEditor.vue';
import MarkdownArea from '@/components/metier/exercice/MarkdownArea.vue';
import { useToast } from 'vue-toastification';
import { useTeacher } from '@/composables/teacher';
import { ref, onMounted, computed } from 'vue';

const toast = useToast();
const props = defineProps({
  sujet: String,
  files: Array
});

// 0 = sujet, 1 = editor, 2 = console
const page = ref(0);
const sujet = ref(null);
const exercicefiles = ref([]);

const { correctCode } = useTeacher();
const consoleOutput = ref({output: "", error: "", status: ""});
const isWriting = ref(true);

const emit = defineEmits(['save', 'cancel']);

const saveExercice = () => {
  if (!sujet.value) {
    toast.error('Le sujet de l\'exercice ne peut pas être vide');
    return;
  }

  if (exercicefiles.value.length === 0) {
    toast.error('Vous devez ajouter des fichiers à l\'exercice');
    return;
  }

  const hasTestFile = exercicefiles.value.some(file => file.type === 'test');
  const hasFile = exercicefiles.value.some(file => file.type === 'file');

  if (!hasTestFile || !hasFile) {
    toast.error('Vous devez ajouter au moins un fichier de type "test" et un fichier de type "file"');
    return;
  }

  emit('save', {
    type: 'code',
    content: sujet.value,
    files: exercicefiles.value,
  });
  toast.success('Exercice sauvegardé avec succès');
};

const correct = async () => {
  const formatedFiles = exercicefiles.value
    .filter(file => file.type !== 'test')
    .map(file => {
      return {
        fileName: file.filename,
        code: file.content
      }
    });
  
  const testFiles = exercicefiles.value
    .filter(file => file.type === 'test')
    .map(file => {
      return {
        fileName: file.filename,
        code: file.content
      }
    });

  consoleOutput.value = null;
  consoleOutput.value = await correctCode(exercicefiles.value[0].language, formatedFiles, testFiles[0]);
}

const cancel = () => {
  emit('cancel');
};

onMounted(() => {
  sujet.value = props.sujet;
  exercicefiles.value = JSON.parse(JSON.stringify(props.files));
});

const isMobile = computed(() => window.innerWidth < 768);
</script>

<template>
  <main :class="['flex-grow flex', isMobile ? 'flex-col h-screen' : '']">
    <div v-if="isMobile" class="flex justify-around border-b-2 dark:border-gray-300 border-slate-800">
      <button @click="page=0" :class="['button-mobile', page==0?'selected':'']">Markdown</button>
      <button @click="page=1" :class="['button-mobile', page==1?'selected':'']">Editor</button>
      <button @click="page=2" :class="['button-mobile', page==2?'selected':'']">Console</button>
    </div>
    <div 
      :class="[
        'flex flex-col border-r-2 dark:border-gray-300 border-slate-800', 
        isMobile ? 'w-full flex-grow' : 'w-[20%]'
      ]" 
      v-if="!isMobile || page === 0"
    >
      <div class="flex p-2 pt-0 gap-2 border-b-2 dark:border-gray-300 border-slate-800">
        <button @click="isWriting = true" :class="['button', isWriting ? 'selected' : '']">Sujet</button>
        <button @click="isWriting = false" :class="['button', !isWriting ? 'selected' : '']">Markdown</button>
      </div>
      <textarea 
        v-if="isWriting" 
        v-model="sujet" 
        class="flex-1 p-2 dark:bg-main-dark dark:text-white min-h-[200px]" 
        placeholder="Ecrire le sujet de l'éxercice ici"
      ></textarea>
      <MarkdownArea v-else :markdown-text="sujet" class="flex-1 min-h-[200px]"/>
      <div class="flex p-2 gap-2 border-t-2 dark:border-gray-300 border-slate-800">
        <button @click="saveExercice" class="menu-button">Valider Exercice</button>
        <button @click="cancel" class="menu-button">Annuler</button>
      </div>
    </div>
    <Editor
      v-if="!isMobile || page === 1"
      :files="exercicefiles" 
      @correct-code="correct"
      :class="[
        'border-r-2 dark:border-gray-300 border-slate-800',
        isMobile ? 'w-full flex-grow min-h-[300px]' : 'w-[60%]'
      ]"
    />
    <Console 
      v-if="!isMobile || page === 2"
      :results="consoleOutput" 
      :language="exercicefiles[0] ? exercicefiles[0].language : 'java'" 
      :class="[
        isMobile ? 'w-full flex-grow min-h-[300px]' : 'w-[20%]'
      ]"
    />
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
  @apply px-4 py-2 bg-primary-dark text-white flex-1 text-sm;
}

.button-mobile.selected {
  @apply bg-primary-light;
}

@media (max-width: 768px) {
  main {
    min-height: calc(100vh - 64px);
  }

  textarea, .markdown-area {
    min-height: 200px;
  }

  .editor, .console {
    min-height: 300px;
  }
}
</style>