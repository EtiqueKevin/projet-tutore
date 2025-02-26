<script setup>
import Console from '@/components/metier/exercice/Console.vue';
import Editor from '@/components/metier/exercice/student/ExerciceEditor.vue';
import MarkdownArea from '@/components/metier/exercice/MarkdownArea.vue';
import { ref, computed, onMounted } from 'vue'
import { useStudent } from '@/composables/student'
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification'

const page = ref(0);
const { loadExercice } = useStudent();

const sujet = ref("");
const files = ref([]);
const consoleText = ref(``);
const loading = ref(true);

const isMobile = computed(() => window.innerWidth < 768);
const isLoaded = computed(() => sujet.value !== "" && files.value.length > 0);

onMounted(async () => {
  const route = useRoute();
  const router = useRouter();
  const toast = useToast();

  try{
    const currentExercice = await loadExercice(route.params.id, route.params.nbContent);
    if(currentExercice){
      sujet.value = currentExercice.content;
      files.value = currentExercice.files.filter(file => file.type === 'file');      
    }else{
      toast.error("L'exercice n'a pas pu être chargé ou n'existe pas")
      router.push({
        name: 'lesson-by-id',
        params:{id:route.params.id}
      })
    }
  }catch (e){
    toast.error("L'exercice n'a pas pu être chargé ou n'existe pas")
    router.push({
      name: 'lesson-by-id',
      params:{id:route.params.id}
    })
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main :class="['flex-grow flex', isMobile ? 'flex-col' : '']">
    <template v-if="loading">
      <div :class="isMobile ? 'w-full' : 'w-[20%] border-r-2'" class="p-4">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4 animate-pulse"></div>
        <div v-for="i in 8" :key="i" 
             class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"
             :style="{ width: `${Math.random() * 40 + 60}%` }">
        </div>
      </div>

      <div :class="isMobile ? 'w-full' : 'w-[60%] border-r-2'" class="p-4">
        <div class="flex gap-2 mb-4">
          <div class="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div class="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse opacity-60"></div>
        </div>
        <div class="border dark:border-gray-700 rounded-md p-4">
          <div v-for="i in 12" :key="i" 
               class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"
               :style="{ width: `${Math.random() * 50 + 50}%` }">
          </div>
        </div>
      </div>

      <div :class="isMobile ? 'w-full' : 'w-[20%]'" class="p-4">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2 animate-pulse"></div>
        <div v-for="i in 5" :key="i" 
             class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"
             :style="{ width: `${Math.random() * 30 + 70}%` }">
        </div>
      </div>
    </template>

    <template v-else>
      <div v-if="isMobile" class="flex justify-around border-b-2">
        <button @click="page=0" :class="['button-mobile', page==0?'selected':'']">Sujet</button>
        <button @click="page=1" :class="['button-mobile', page==1?'selected':'']">Editeur</button>
        <button @click="page=2" :class="['button-mobile', page==2?'selected':'']">Console</button>
      </div>
      <MarkdownArea v-if="(!isMobile || page === 0) && isLoaded" :markdown-text="sujet" class="dark:border-gray-300 border-slate-800" :class="isMobile ? 'max-w-none flex-grow' : 'w-[20%] border-r-2'"/>
      <Editor v-if="(!isMobile || page === 1) && isLoaded" :files="files" class="dark:border-gray-300 border-slate-800" :class="isMobile ? 'max-w-none flex-grow' : 'w-[60%] border-r-2'"/>
      <Console v-if="(!isMobile || page === 2) && isLoaded" :results="consoleText" :class="isMobile ? 'w-full' : 'w-[20%]'"/>
    </template>
  </main>
</template>

<style scoped>
.button-mobile {
  @apply px-4 py-2 bg-primary-dark text-white flex-1;
}

.button-mobile.selected {
  @apply bg-primary-light;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
