<script setup>
import { ref, watch } from 'vue';
import MonacoEditor from '@/components/metier/exercice/MonacoEditor.vue';
import FileSwitcher from '@/components/metier/exercice/student/FileSwitcher.vue';

const props = defineProps({
  files: Array
});

const emit = defineEmits(['correct-code']);

const currentFile = ref(props.files[0]);
const currentFileIndex = ref(0);

const handleFileSelected = ({ file, index }) => {
  currentFile.value = file;
  currentFileIndex.value = index;
};

const handleContentUpdate = (newContent) => {
  props.files[currentFileIndex.value].content = newContent;
};
</script>

<template>
  <div class="container relative">
    <FileSwitcher 
      :files="props.files" 
      @fileSelected="handleFileSelected" 
    />
    <MonacoEditor 
      :language="currentFile.language" 
      :value="currentFile.content" 
      @update:value="handleContentUpdate"
    />
    <button 
      @click="emit('correct-code')" 
      class="bg-primary-dark hover:bg-primary-light p-4 rounded-full h-15 w-15 flex items-center justify-center absolute group gap-4 text-white"
    >
      <p class="hidden group-hover:block">Corriger l'exercice</p>
      <i class="fas fa-check text-lg"></i>
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;
}

button {
  bottom: 2%;
  right: 2%;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: translateX(8px);
}

button p {
  transition: opacity 0.3s ease-in-out;
}

button:hover p {
  opacity: 1;
}
</style>
