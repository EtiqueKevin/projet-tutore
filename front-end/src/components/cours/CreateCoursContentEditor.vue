<script setup>
import { ref } from 'vue';

const props = defineProps({
  content: Array,
});

const emit = defineEmits(['update:content', 'editExercice']);

const draggedItem = ref(null);
const dragOverIndex = ref(null);

const handleDragStart = (index, event) => {
  draggedItem.value = index;
  event.currentTarget.classList.add('dragging');
  // Set ghost image data
  event.dataTransfer.effectAllowed = 'move';
};

const handleDragEnd = (event) => {
  event.currentTarget.classList.remove('dragging');
  draggedItem.value = null;
  dragOverIndex.value = null;
};

const handleDragOver = (index, event) => {
  event.preventDefault();
  if (index !== draggedItem.value) {
    dragOverIndex.value = index;
  }
};

const handleDrop = (index, event) => {
  event.preventDefault();
  event.stopPropagation();
  
  if (draggedItem.value !== null && draggedItem.value !== index) {
    const newContent = [...props.content];
    const item = newContent[draggedItem.value];
    newContent.splice(draggedItem.value, 1);
    newContent.splice(index, 0, item);
    emit('update:content', newContent);
  }
  draggedItem.value = null;
  dragOverIndex.value = null;
};

const deleteItem = (index) => {
  const newContent = [...props.content];
  newContent.splice(index, 1);
  emit('update:content', newContent);
};

const updateItemContent = (index, newContent) => {
  const updatedContent = [...props.content];
  updatedContent[index].content = newContent;
  emit('update:content', updatedContent);
};
</script>

<template>
  <div id="drop-zones" class="flex flex-col p-4 h-full text-black dark:text-white relative" @dragover.prevent>
    <p v-if="!content.length" class="text-center text-3xl">Glissez des éléments ici</p>

    <!-- Liste des items -->
    <div 
      v-for="(item, index) in content" 
      :key="index" 
      class="droppable"
      draggable="true"
      @dragstart="handleDragStart(index, $event)"
      @dragend="handleDragEnd($event)"
      @dragover="handleDragOver(index, $event)"
      @drop="handleDrop(index, $event)"
      :class="{
        'dragging': draggedItem === index,
        'drag-over': dragOverIndex === index
      }"
    >
      <!-- Drag handle -->
      <div class="drag-handle">
        <i class="fas fa-grip-vertical"></i>
      </div>

      <!-- Contenu de l'item -->
      <div class="flex-1">
        <textarea 
          v-if="item.type === 'text'" 
          :value="item.content"
          @input="updateItemContent(index, $event.target.value)"
          placeholder="Ecrivez votre texte ici (Markdown compatible)" 
          class="text-area"
        ></textarea>
        <div v-if="item.type === 'code'" class="exercice">
          <div class="mr-4">
            <button @click="$emit('editExercice', index)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Editer Exercice
            </button>
          </div>
          <div class="flex flex-col">
            <p>Fichiers : </p>
            <p>{{ item.files.map(file => file.filename).join(', ') }}</p>
          </div>
        </div>
      </div>
      
      <!-- Buttons de controle -->
      <div class="flex flex-col ml-4">
        <button @click="deleteItem(index)" class="mb-2">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exercice {
  @apply w-full p-4 flex
    bg-white dark:bg-gray-700
    border border-gray-200;
}

.text-area {
  @apply w-full border border-gray-200 rounded p-2 bg-white dark:bg-gray-700;
}

.droppable {
  @apply w-full mb-4 p-4 
    border border-gray-300 dark:border-gray-600 
    rounded-lg
    bg-white dark:bg-gray-700
    shadow-sm hover:shadow-md
    transition-all duration-200
    flex items-center
    cursor-pointer;
}

.drag-handle {
  @apply mr-4 text-gray-400 cursor-move;
}

.dragging {
  @apply opacity-50 border-dashed;
}

.drag-over {
  @apply border-primary-dark border-2 dark:border-primary-light;
}
</style>