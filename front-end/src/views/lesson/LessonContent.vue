<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStudent } from '@/composables/student'
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification'
import QuizzView from '../exercices/QuizzView.vue';
import ExerciceView from '../exercices/ExerciceView.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const page = ref(0); //0 = aucun, 1 = exo, 2 = quizz
const content = ref(null);
const { loadContent } = useStudent();

onMounted(async () => {

  try{
    content.value = await loadContent(route.params.id, route.params.nbContent);
  }catch (e){
    toast.error("Le contenu n'a pas pu être chargé ou n'existe pas")
    router.push({
      name: 'lesson-by-id',
      params:{id:route.params.id}
    })
  }

  if(!content.value){
    toast.error("Le contenu n'a pas pu être chargé ou n'existe pas")
      router.push({
        name: 'lesson-by-id',
        params:{id:route.params.id}
      })   
  }

  if(content.value.type == 'code'){
    page.value=1;
  }else{
    page.value=2;
  }
});
</script>

<template>
    <!-- skeleton loader -->
    <div v-if="page==0" class="flex-grow p-6">
        <div class="border dark:border-gray-700 rounded-md p-4">
          <div v-for="i in 12" :key="i"
               class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"
               :style="{ width: `${Math.random() * 50 + 50}%` }">
          </div>
        </div>
    </div>
    <ExerciceView 
        v-if="page==1"
        :sujet-p="content.content"
        :files-p="content.files"
    ></ExerciceView>
    
    <QuizzView
        v-if="page==2"
        :titre="content.content"
        :questions="content.questions"
  ></QuizzView>
</template>

<style scoped>
</style>
