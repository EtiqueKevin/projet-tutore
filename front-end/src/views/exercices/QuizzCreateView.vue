<script setup>
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

const emit = defineEmits(['cancel', 'save']);
const props = defineProps({
    titre: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
    }
});
const toast = useToast();

const currentTitre = ref('');
const currentQuestions = ref([]);
const newQuestion = ref({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
});
const editingIndex = ref(-1);

const addQuestion = () => {
    if (newQuestion.value.question && 
        newQuestion.value.options.every(opt => opt !== '') &&
        newQuestion.value.correctAnswer) {
        if (editingIndex.value === -1) {
            currentQuestions.value.push({ ...newQuestion.value });
        } else {
            currentQuestions.value[editingIndex.value] = { ...newQuestion.value };
            editingIndex.value = -1;
        }
        newQuestion.value = {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: ''
        };
    } else {
        toast.warning('Il faut un titre, 4 options et une bonne réponse !!');
    }
};

const editQuestion = (index) => {
    newQuestion.value = { ...currentQuestions.value[index] };
    editingIndex.value = index;
};

const removeQuestion = (index) => {
    currentQuestions.value.splice(index, 1);
    if (editingIndex.value === index) {
        editingIndex.value = -1;
        newQuestion.value = {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: ''
        };
    }
};

const moveQuestion = (index, direction) => {
    if (direction === 'up' && index > 0) {
        const temp = currentQuestions.value[index];
        currentQuestions.value[index] = currentQuestions.value[index - 1];
        currentQuestions.value[index - 1] = temp;
    } else if (direction === 'down' && index < currentQuestions.value.length - 1) {
        const temp = currentQuestions.value[index];
        currentQuestions.value[index] = currentQuestions.value[index + 1];
        currentQuestions.value[index + 1] = temp;
    }
};

const saveQuizz = () => {
    if (currentTitre.value && currentQuestions.value.length > 0) {
        emit('save', {
            type: 'quizz',
            content: currentTitre.value,
            questions: currentQuestions.value
        });
    }
};

const cancel = () => {
    emit('cancel');
}

onMounted(() => {
    currentTitre.value = props.titre;
    currentQuestions.value = props.questions;
});
</script>

<template>
    <main class="container mx-auto p-4 my-4 bg-white dark:bg-background-dark shadow-md space-y-4">
        <h1 class="text-3xl font-bold text-black dark:text-white">Créer un quizz</h1>

        <!-- titre du quizz -->
        <div class="dark:border-gray-300 border-slate-800">
            <label class="block text-black dark:text-white text-sm font-bold mb-2">
                Titre du quizz
            </label>
            <input v-model="currentTitre" type="text" class="w-full px-3 py-2 border rounded-lg"
                placeholder="Entrez le titre du quizz">
        </div>

        <span class="separator"></span>

        <!-- Ajouter/Modifier une Question -->
        <div>
            <h2 class="text-xl font-bold mb-4 text-black dark:text-white">
                {{ editingIndex === -1 ? 'Ajouter une question' : 'Modifier la question' }}
            </h2>

            <div class="mb-4">
                <label class="block text-black dark:text-white text-sm font-bold mb-2">Question</label>
                <input v-model="newQuestion.question" type="text" class="w-full px-3 py-2 border rounded-lg"
                    placeholder="Entrez la question">
            </div>

            <div class="mb-4">
                <label class="block text-black dark:text-white text-sm font-bold mb-2">Options</label>
                <div class="space-y-2">
                    <input v-for="(option, index) in newQuestion.options" :key="index"
                        v-model="newQuestion.options[index]" type="text" class="w-full px-3 py-2 border rounded-lg"
                        :placeholder="`Option ${index + 1}`">
                </div>
            </div>

            <div class="mb-4">
                <label class="block text-black dark:text-white text-sm font-bold mb-2">Réponse correcte</label>
                <select v-model="newQuestion.correctAnswer" class="w-full px-3 py-2 border rounded-lg">
                    <option value="" disabled>Sélectionnez la bonne réponse</option>
                    <option v-for="(option, index) in newQuestion.options" :key="index" :value="option">
                        {{ option }}
                    </option>
                </select>
            </div>

            <button @click="addQuestion"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                {{ editingIndex === -1 ? 'Ajouter la question' : 'Mettre à jour la question' }}
            </button>
        </div>

        <span class="separator" v-if="currentQuestions.length > 0"></span>

        <!-- Liste des questions -->
        <div v-if="currentQuestions.length > 0">
            <h2 class="text-xl font-bold mb-4 text-black dark:text-white">Questions du quizz</h2>
            <div class="space-y-4">
                <div v-for="(q, index) in currentQuestions" :key="index"
                    class="bg-white p-4 rounded-lg border"
                    :class="{ 'border-blue-500': editingIndex === index }">
                    <div class="flex justify-between items-start">
                        <div class="flex-grow">
                            <p class="font-bold">{{ q.question }}</p>
                            <ul class="list-disc list-inside mt-2">
                                <li v-for="(option, indexQ) in q.options" :key="option+'-'+indexQ"
                                    :class="{ 'text-green-600 font-bold': option === q.correctAnswer }">
                                    {{ option }}
                                </li>
                            </ul>
                        </div>
                        <div class="flex flex-col gap-2 ml-4">
                            <button @click="moveQuestion(index, 'up')"
                                class="text-blue-500 hover:text-blue-700"
                                :disabled="index === 0"
                                title="Déplacer la question vers le haut">
                                <i class="fas fa-arrow-up" />
                            </button>
                            <button @click="moveQuestion(index, 'down')"
                                class="text-blue-500 hover:text-blue-700"
                                :disabled="index === currentQuestions.length - 1"
                                title="Déplacer la question vers le bas">
                                <i class="fas fa-arrow-down" />
                            </button>
                            <button @click="editQuestion(index)"
                                class="text-yellow-500 hover:text-yellow-700"
                                title="Modifier la question">
                                <i class="fas fa-edit" />
                            </button>
                            <button @click="removeQuestion(index)"
                                class="text-red-500 hover:text-red-700"
                                title="Supprimer la question">
                                <i class="fas fa-trash" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <span class="separator"></span>

        <!-- bouttons -->
        <div class="flex p-2 gap-2">
            <button @click="saveQuizz"
                class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                :disabled="!currentTitre || currentQuestions.length === 0">
                Enregistrer le quizz
            </button>
            <button @click="cancel"
                class="px-4 py-2 cursor-pointer bg-primary-dark hover:bg-primary-light rounded text-white">
                Annuler
            </button>
        </div>
    </main>
</template>

<style scoped>
.separator {
    height: 1px;
    @apply block border-t-2 dark:border-gray-300 border-slate-800 w-full;
}
</style>