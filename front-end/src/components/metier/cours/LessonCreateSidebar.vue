<script setup>

const props = defineProps({
  mode: Number,
  isMobile: Boolean
});

const emit = defineEmits(['update:mode', 'save', 'dragStart']);

const dragStart = (e, type) => {
  emit('dragStart', e, type);
};
</script>

<template>
  <div class="w-full md:w-1/4 p-4 dark:bg-background-dark bg-background-light">
    <button @click="emit('update:mode', 0)" :class="{'button': true, 'selected': mode === 0}">
      Titre et description
    </button>
    <button @click="emit('update:mode', 1)" :class="{'button': true, 'selected': mode === 1}">
      Contenu
    </button>
    <button @click="emit('update:mode', 2)" :class="{'button': true, 'selected': mode === 2}">
      Aperçu
    </button>
    <button @click="emit('save')" class="button">Sauvegarder le cours</button>

    <div v-if="mode === 1" id="drop-possibilities" class="p-4 mt-4 border-t-2 text-dark dark:text-white">
      <h1 class="text-3xl mb-4">Eléments à ajouter</h1>
      <div 
        @dragstart="dragStart($event, 'text')"
        draggable="true"
        class="cursor-pointer drag-element"
      >
        Text
      </div>
      <div 
        @dragstart="dragStart($event, 'code')"
        draggable="true"
        class="cursor-pointer drag-element"
      >
        Exercice
      </div>
      <div 
        @dragstart="dragStart($event, 'quizz')"
        draggable="true"
        class="cursor-pointer drag-element"
      >
        Quizz
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  @apply bg-primary-light dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light w-full mb-2 py-2 px-4;
  @apply text-white font-bold rounded;
  transition: transform 0.2s;
}

.button.selected {
  @apply bg-primary-dark dark:bg-primary-light;
  transform: translateX(15px);
}

.drag-element {
  @apply border-2 border-gray-400 dark:border-gray-600 p-3 mt-4 rounded-lg;
  @apply bg-white dark:bg-gray-700 shadow-sm;
  @apply hover:border-primary-light dark:hover:border-primary-dark;
  @apply hover:shadow-md;
  transition: all 0.2s ease-in-out;
}
</style>