<script setup>
import { ref, computed } from 'vue';
import { marked } from 'marked';
import ExerciceCreateView from './ExerciceCreateView.vue';

// 0 = Modification titre et description
// 1 = Modification contenu
// 2 = preview du cours
// 3 = Création d'un exercice

const mode = ref(0);

const cours = ref({
    title: '',
    description: '',
    content: [],
});

const currentExerciceIndex = ref(null);

const dragStart = (e, type) => {
    e.dataTransfer.setData('text/plain', type);
};

const allowDrop = (e) => {
    e.preventDefault();
};

const drop = (e) => {
    e.preventDefault();
    const dropZone = document.getElementById('drop-zones');
    const type = e.dataTransfer.getData('text/plain');
    const dropPosition = Array.from(dropZone.children).indexOf(e.target.closest('.droppable'));

    let newContent;

    switch (type) {
        case 'text':
            newContent = {
                type: 'text',
                content: ''
            };
            if (dropPosition === -1) {
                cours.value.content.push(newContent);
            } else {
                cours.value.content.splice(dropPosition, 0, newContent);
            }
            break;
        case 'exercice':
            newContent = {
                type: 'exercice',
                statement: '',
                files: [],
            };
            if (dropPosition === -1) {
                currentExerciceIndex.value = cours.value.content.length;
                cours.value.content.push(newContent);
            } else {
                currentExerciceIndex.value = dropPosition;
                cours.value.content.splice(dropPosition, 0, newContent);
            }
            break;
    }
};

const previewContent = computed(() => {
    return cours.value.content.map(item => {
        if (item.type === 'text') {
            return marked(item.content);
        } else if (item.type === 'exercice') {
            return `<button class="w-full mb-4 p-2 border border-gray-400">Exercice</button>`;
        }
    }).join('');
});

const saveCours = () => {
    console.log(cours.value);
};

const switchToCoursCreateView = () => {
    mode.value = 1;
};

const saveExercice = (exercice) => {
    cours.value.content[currentExerciceIndex.value] = exercice;
    switchToCoursCreateView();
};

const editExercice = (index) => {
    currentExerciceIndex.value = index;
    mode.value = 3;
    console.log(cours.value.content[index]);
};

const moveUp = (index) => {
    const item = cours.value.content[index];
    cours.value.content.splice(index, 1);
    cours.value.content.splice(index - 1, 0, item);
};

const moveDown = (index) => {
    const item = cours.value.content[index];
    cours.value.content.splice(index, 1);
    cours.value.content.splice(index + 1, 0, item);
};

const deleteItem = (index) => {
    cours.value.content.splice(index, 1);
};

</script>

<template>
    <main v-if="!(mode==3)" class="flex-grow flex p-4 gap-4">
        <!-- Left column -->
        <div id="left-column" class="w-1/4 p-4 dark:bg-gray-800 bg-slate-200">
            <button @click="mode=0" :class="{'button': true, 'selected': mode == 0}">Titre et description</button>
            <button @click="mode=1" :class="{'button': true, 'selected': mode == 1}">Contenu</button>
            <button @click="mode=2" :class="{'button': true, 'selected': mode == 2}">Aperçu</button>
            <button @click="saveCours" class="button">Sauvegarder le cours</button>
            <div v-if="mode==1" id="drop-possibilities" class="p-4 r mt-4 border-t-2 text-black dark:text-white">
                <h1 class="text-3xl mb-4">Eléments à ajouter</h1>
                <div 
                    @dragstart="dragStart($event, 'text')"
                    draggable="true"
                    class="cursor-pointer drag-element"
                >
                    Text
                </div>
                <div 
                    @dragstart="dragStart($event, 'exercice')"
                    draggable="true"
                    class="cursor-pointer drag-element"
                >
                    Exercice
                </div>
            </div>
        </div>

        <!-- Right column -->
        <div id="right-column" class="w-3/4 h-full dark:bg-gray-800 bg-slate-200">
            <div v-if="mode==0" class="p-4">
                <h1 class="text-2xl mb-4 text-black dark:text-white">Création d'un cours</h1>
                <input type="text" v-model="cours.title" placeholder="Titre du cours" class="w-full mb-4 p-2 border text-black">
                <textarea v-model="cours.description" placeholder="Description du cours" class="w-full mb-4 p-2 border text-black"></textarea>
                <button @click="mode=1" class="py-2 px-4 bg-primary-light hover:bg-primary-dark">Suivant</button>
            </div>
            <div v-if="mode==1" id="drop-zones" class="flex flex-col p-4 h-full text-black dark:text-white" @dragover="allowDrop" @drop="drop"> 
                <p v-if="!cours.content.length" class="text-center text-3xl">Glissez des éléments ici</p>
                <div v-for="(item, index) in cours.content" :key="index" class="droppable flex justify-between items-center">
                    <div class="flex-1">
                        <textarea v-if="item.type === 'text'" v-model="item.content" placeholder="Ecrivez votre texte ici" class="w-full mb-4 p-2 border text-black"></textarea>
                        <div v-if="item.type === 'exercice'" class="w-full mb-4 p-4 border border-gray-400 rounded flex">
                            <div class="mr-4">
                                <button @click="editExercice(index)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editer Exercice</button>
                            </div>
                            <div class="flex flex-col">
                                <p>Fichiers : </p>
                                <p>{{ item.files.map(file => file.filename).join(', ') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col ml-4">
                        <button @click="moveUp(index)" :disabled="index === 0" class="mb-2">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button @click="deleteItem(index)" class="mb-2">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button @click="moveDown(index)" :disabled="index === cours.content.length - 1" class="mb-2">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                    </div>
                </div>

            </div>
            <div v-if="mode==2" class="p-4 prose dark:prose-white">
                <h1>{{ cours.title }}</h1>
                <p>{{ cours.description }}</p>
                <div v-html="previewContent"></div>
            </div>
        </div>
    </main>
    <ExerciceCreateView 
        v-if="mode==3" 
        :sujet="cours.content[currentExerciceIndex]?.statement" 
        :files="cours.content[currentExerciceIndex]?.files" 
        @save="saveExercice" 
        @cancel="switchToCoursCreateView" 
    />
</template>

<style scoped>
.button {
    @apply bg-primary-light dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light w-full mb-2 py-2 px-4;
    transition: transform 0.2s;
}

.button.selected {
    @apply bg-primary-dark dark:bg-primary-light ;
    transform: translateX(15px);
}

.drag-element {
    @apply border border-gray-400 p-2 mt-4;
}
</style>
