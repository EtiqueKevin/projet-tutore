<script setup>
import { ref } from 'vue';

const name = ref('');
const language = ref('java');
const type = ref('file');

const emit = defineEmits(['fileAdded', 'close']);

const addFile = () => {
    const extension = language.value === 'java' ? '.java' : '.js';
    
    const firstPart = name.value.split('.')[0];
    
    const file = {
        type: type.value,
        filename: firstPart + extension,
        content: '',
        language: language.value
    };
    emit('fileAdded', file);
    emit('close');
};
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10" @click.stop="emit('close')">
        <div class="bg-main-dark rounded-lg shadow-lg p-6 w-full max-w-md" @click.stop>
            <form class="flex flex-col space-y-4 text-white">
                <label for="file-name">Nom du fichier</label>
                <input type="text" id="file-name" v-model="name" class="border rounded p-2 text-black" />
                <label for="file-language">Language</label>
                <select id="file-language" v-model="language" class="border rounded p-2 text-black">
                    <option value="java">Java</option>
                    <option value="javascript">Javascript</option>
                </select>
                <label for="file-type">Type de fichier</label>
                <select id="file-type" v-model="type" class="border rounded p-2 text-black">
                    <option value="file">Fichier</option>
                    <option value="test">Test</option>
                </select>
                <button type="submit" @click.stop.prevent="addFile" class="bg-primary-dark text-white rounded p-2">Ajouter</button>
            </form>
        </div>
    </div>
</template>