<script setup>
import { ref, watch } from 'vue';
import MonacoEditor from '@/components/editor/MonacoEditor.vue';
import FileSwitcher from '@/components/editor/student/FileSwitcher.vue';

const props = defineProps({
  files: Array
});

const currentFile = ref(props.files[0]);

const handleFileSelected = (file) => {
  currentFile.value = file;
};

const handleContentUpdate = (newContent) => {
  const file = props.files.find(f => f.name === currentFile.value.name);
  if (file) {
    file.content = newContent;
  }
};

watch(currentFile, (newFile) => {
  const file = props.files.find(f => f.name === newFile.name);
  if (file) {
    file.content = newFile.content;
  }
});
</script>

<template>
  <div class="container">
    <FileSwitcher :files="props.files" @fileSelected="handleFileSelected" />
    <MonacoEditor :language="currentFile.language" :value="currentFile.content" @update:value="handleContentUpdate"/>
    <button @click="$emit('correct-code')" class="bg-primary-dark hover:bg-primary-light p-4 rounded-full h-15 w-15 flex items-center justify-center absolute group gap-4 text-white">
      <p class="hidden group-hover:block">Corriger l'exercice</p>
      <i class="fas fa-check text-lg"></i>
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
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
