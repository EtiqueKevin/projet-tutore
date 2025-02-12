<script setup>
import { onMounted, ref, computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: false
    },
    lessons: {
        type: Array,
        required: false
    }
});

const moduleName = ref('')
const lessons = ref([])
const newLesson = ref('')

const addLesson = () => {
    if (newLesson.value.trim()) {
        lessons.value.push(newLesson.value)
        newLesson.value = ''
    }
}

const removeLesson = (index) => {
    lessons.value.splice(index, 1)
}

const handleSubmit = () => {
    // Handle form submission here
    console.log({
        name: moduleName.value,
        lessons: lessons.value
    })
}

const titre = computed(() => {
    return props.name ? `Modifier le module ${props.name}` : 'Créer un module'
})

onMounted(() => {
    if (props.lessons) {
        lessons.value = props.lessons
    }
    if (props.name) {
        moduleName.value = props.name
    }
});
</script>

<template>
    <main class="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">{{titre}}</h1>
        <form @submit.prevent="handleSubmit" class="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-6 transition-all duration-300">
            <div class="space-y-4">
                <input 
                    id="moduleName"
                    v-model="moduleName"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 dark:text-gray-100"
                    placeholder="Nom du module"
                >
            </div>

            <div class="space-y-4">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200">Leçons</label>
                <div class="flex gap-3">
                    <input 
                        v-model="newLesson"
                        type="text"
                        placeholder="Ajouter une leçon"
                        class="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 dark:text-gray-100"
                    >
                    <button 
                        type="button" 
                        @click="addLesson"
                        title="Ajouter"
                        class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                    >
                        <span>Ajouter</span>
                    </button>
                </div>
                
                <ul class="space-y-3">
                    <li 
                        v-for="(lesson, index) in lessons" 
                        :key="index"
                        class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 group hover:shadow-md transition-all duration-200"
                    >
                        <span class="text-gray-700 dark:text-gray-200">{{ lesson }}</span>
                        <button 
                            type="button" 
                            @click="removeLesson(index)"
                            title="Supprimer"
                            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 opacity-80 group-hover:opacity-100"
                        >
                            Supprimer
                        </button>
                    </li>
                </ul>
            </div>

            <button 
                type="submit"
                title="Enregistrer"
                class="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
                Enregistrer
            </button>
        </form>
    </main>
</template>