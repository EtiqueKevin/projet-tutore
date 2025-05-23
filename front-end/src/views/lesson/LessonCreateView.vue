<script setup>
import { ref, computed, onMounted } from 'vue';
import ExerciceCreateView from '@/views/exercices/ExerciceCreateView.vue';
import LessonCreateSidebar from '@/components/metier/cours/LessonCreateSidebar.vue';
import LessonCreateContentEditor from '@/components/metier/cours/LessonCreateContentEditor.vue';
import LessonCreatePreview from '@/components/metier/cours/LessonCreatePreview.vue';
import { useLessonStore } from '@/stores/lesson';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import QuizzCreateView from '../exercices/QuizzCreateView.vue';

const router = useRouter();
const mode = ref(0);
const currentExerciceIndex = ref(null);
const lessonStore = useLessonStore();
const toast = useToast();

const cours = computed(() => lessonStore.getCurrentLesson);

const isMobile = computed(() => window.innerWidth <= 768);

// gestion du drag and drop 

const dragStart = (e, type) => {
  e.dataTransfer.setData('text/plain', type);
};

const allowDrop = (e) => {
  e.preventDefault();
};

const drop = (e) => {
  e.preventDefault();

  const type = e.dataTransfer.getData('text/plain');
  if (!type || (type !== 'text' && type !== 'code' && type !== 'quizz')) {
    return;
  }

  const dropZone = document.getElementById('drop-zones');
  const dropPosition = Array.from(dropZone.children).indexOf(e.target.closest('.droppable'));
  
  const posibleContent = {
    text: { type: 'text', content: '' },
    code: { type: 'code', statement: '', files: [] },
    quizz: { type: 'quizz', title:'', questions: [] }
  }

  const newContent = posibleContent[type];
    
  if (type === 'code') {
    currentExerciceIndex.value = dropPosition !== -1 ? dropPosition : cours.value.content.length;
  }
  
  if (dropPosition !== -1) {
    const newContent = [...cours.value.content];
    newContent.splice(dropPosition, 0, newContent);
    lessonStore.overWriteContent(newContent);
  } else {
    lessonStore.addContent(newContent);
  }
};


// gestion des données

const saveCours = async () => {
  if(!lessonStore.isValid){
    toast.error("La leçon n'est pas valide (titre, description, type et contenu requis)");
    return;
  }

  const moduleId = lessonStore.getCurrentLesson.moduleId;
  const success = await lessonStore.saveCurrentLesson();
  if (success){
    toast.success("Leçon enregistré avec succès");
    router.push({ name: 'teacher-module-id', params: { id: moduleId } });
  }else{
    toast.error("Erreur lors de l'enregistrement de la leçon");
  }
};

const switchToCoursCreateView = () => {
  mode.value = 1;
};

const saveContent = (exercice) => {
  lessonStore.updateContent(currentExerciceIndex.value, exercice);
  switchToCoursCreateView();
};

const editExercice = (index) => {
  currentExerciceIndex.value = index;
  mode.value = 3;
};

const editQuizz = (index) => {
  currentExerciceIndex.value = index;
  mode.value = 4;
};

const isEditingLesson = computed(() => mode.value === 0 || mode.value === 1 || mode.value === 2);
</script>

<template>
  <main v-if="isEditingLesson" class="flex-grow flex p-4 gap-4" :class="{'flex-col': isMobile, 'flex-row': !isMobile}">
    <LessonCreateSidebar 
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
          v-model="cours.title" 
          placeholder="Titre du cours" 
          class="w-full mb-4 p-2 border text-black"
        >
        <textarea 
          v-model="cours.description" 
          placeholder="Description du cours" 
          class="w-full mb-4 p-2 border text-black"
        ></textarea>

        <input
          type="text"
          v-model="cours.type"
          placeholder="Type du cours (ex: java, python, ...)"
          class="w-full mb-4 p-2 border text-black"
        >

        <button @click="mode = 1" class="py-2 px-4 bg-primary-light hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary-light text-white">Suivant</button>
      </div>

      <LessonCreateContentEditor
        v-if="mode === 1"
        v-model:content="cours.content"
        @editExercice="editExercice"
        @editQuizz="editQuizz"
        @dragover="allowDrop"
        @drop="drop"
        @reorder="lessonStore.overWriteContent($event)"
      />

      <LessonCreatePreview
        v-if="mode === 2"
        :cours="cours"
      />
    </div>
  </main>

  <ExerciceCreateView 
    v-if="mode === 3" 
    :sujet="cours.content[currentExerciceIndex]?.content" 
    :files="cours.content[currentExerciceIndex]?.files" 
    @save="saveContent" 
    @cancel="switchToCoursCreateView" 
  />

  <QuizzCreateView 
    v-if="mode === 4" 
    :titre="cours.content[currentExerciceIndex]?.title" 
    :questions="cours.content[currentExerciceIndex]?.questions"
    @save="saveContent"
    @cancel="switchToCoursCreateView"
  />
</template>