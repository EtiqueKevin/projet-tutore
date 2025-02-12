<script setup>
import { ref, computed, onMounted } from 'vue';
import ExerciceCreateView from '@/views/exercices/ExerciceCreateView.vue';
import CreateCoursSidebar from '@/components/cours/CreateCoursSidebar.vue';
import CreateCoursContentEditor from '@/components/cours/CreateCoursContentEditor.vue';
import CreateCoursPreview from '@/components/cours/CreateCoursPreview.vue';
import { useTeacherStore } from '@/stores/teacher';

const mode = ref(0);
const currentExerciceIndex = ref(null);
const teacherStore = useTeacherStore();

const cours = computed(() => teacherStore.getCurrentLesson);

const isMobile = computed(() => window.innerWidth <= 768);

const dragStart = (e, type) => {
  e.dataTransfer.setData('text/plain', type);
};

const allowDrop = (e) => {
  e.preventDefault();
};

const drop = (e) => {
  e.preventDefault();

  const type = e.dataTransfer.getData('text/plain');
  if (!type || (type !== 'text' && type !== 'exercice')) {
    return;
  }

  const dropZone = document.getElementById('drop-zones');
  const dropPosition = Array.from(dropZone.children).indexOf(e.target.closest('.droppable'));
  
  const newContent = type === 'text' 
    ? { type: 'text', content: '' }
    : { type: 'exercice', statement: '', files: [] };
    
  if (type === 'exercice') {
    currentExerciceIndex.value = dropPosition !== -1 ? dropPosition : cours.value.content.length;
  }
  
  if (dropPosition !== -1) {
    const newContent = [...cours.value.content];
    newContent.splice(dropPosition, 0, newContent);
    teacherStore.overWriteContent(newContent);
  } else {
    teacherStore.addContent(newContent);
  }
};

const saveCours = () => {
  console.log(cours.value);
};

const switchToCoursCreateView = () => {
  mode.value = 1;
};

const saveExercice = (exercice) => {
  teacherStore.updateContent(currentExerciceIndex.value, exercice);
  switchToCoursCreateView();
};

const editExercice = (index) => {
  currentExerciceIndex.value = index;
  mode.value = 3;
};

</script>

<template>
  <main v-if="mode !== 3" class="flex-grow flex p-4 gap-4" :class="{'flex-col': isMobile, 'flex-row': !isMobile}">
    <CreateCoursSidebar 
      :mode="mode"
      :is-mobile="isMobile"
      @update:mode="mode = $event"
      @save="saveCours"
      @dragStart="dragStart"
    />

    <div id="right-column" class="w-full md:w-3/4 dark:bg-background-dark bg-background-light">
      <div v-if="mode === 0" class="p-4">
        <h1 class="text-2xl mb-4 text-black dark:text-white">Création d'un cours</h1>
        <input 
          type="text" 
          v-model="teacherStore.currentLesson.title" 
          placeholder="Titre du cours" 
          class="w-full mb-4 p-2 border text-black"
        >
        <textarea 
          v-model="teacherStore.currentLesson.description" 
          placeholder="Description du cours" 
          class="w-full mb-4 p-2 border text-black"
        ></textarea>
        <button @click="mode = 1" class="py-2 px-4 bg-primary-light hover:bg-primary-dark">Suivant</button>
      </div>

      <CreateCoursContentEditor
        v-if="mode === 1"
        v-model:content="teacherStore.currentLesson.content"
        @editExercice="editExercice"
        @dragover="allowDrop"
        @drop="drop"
        @reorder="teacherStore.overWriteContent($event)"
      />

      <CreateCoursPreview
        v-if="mode === 2"
        :cours="cours"
      />
    </div>
  </main>

  <ExerciceCreateView 
    v-if="mode === 3" 
    :sujet="cours.content[currentExerciceIndex]?.statement" 
    :files="cours.content[currentExerciceIndex]?.files" 
    @save="saveExercice" 
    @cancel="switchToCoursCreateView" 
  />
</template>