<script setup>
const props = defineProps({
  modules: {
    type: Array,
    required: true
  },
  selected: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['breadcrumbClick']);
</script>

<template>
  <div class="border-b p-2 sm:p-4 dark:border-gray-700">
    <div class="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm dark:text-gray-200">
      <button 
        @click="$emit('breadcrumbClick', 'module')"
        class="flex items-center gap-0.5 sm:gap-1 hover:text-blue-600 dark:hover:text-blue-400"
        title="Voir le module"
      >
        <i class="fas fa-book text-xs sm:text-sm"></i>
        <span class="font-medium truncate max-w-[120px] sm:max-w-xs">{{ modules.find(m => m.id === selected.module)?.name || 'Module' }}</span>
      </button>
      
      <template v-if="selected.lesson">
        <i class="fas fa-chevron-right text-xs sm:text-sm text-gray-400 dark:text-gray-500"></i>
        <button 
          @click="$emit('breadcrumbClick', 'lesson')"
          class="flex items-center gap-0.5 sm:gap-1 hover:text-blue-600 dark:hover:text-blue-400"
          title="Voir la leçon"
        >
          <i class="fas fa-list-alt text-xs sm:text-sm"></i>
          <span class="font-medium truncate max-w-[120px] sm:max-w-xs">{{ selected.lesson.lessonInfo.name }}</span>
        </button>
      </template>
      
      <template v-if="selected.exercise">
        <i class="fas fa-chevron-right text-xs sm:text-sm text-gray-400 dark:text-gray-500"></i>
        <div class="flex items-center gap-0.5 sm:gap-1">
          <i class="fas fa-code text-xs sm:text-sm"></i>
          <span class="font-medium">Exercice {{ selected.lesson.errors.indexOf(selected.exercise) + 1 }}</span>
        </div>
      </template>
    </div>
  </div>
</template>