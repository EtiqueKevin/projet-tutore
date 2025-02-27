<script setup>
import { ref } from 'vue';

const name = ref('');
const language = ref('java');
const type = ref('file');
const extensions = {
    java: '.java',
    python: '.py'
};

const emit = defineEmits(['fileAdded', 'close']);

const addFile = () => {
    const firstPart = name.value.split('.')[0];

    const files = [
        {
            type: type.value,
            filename: firstPart + extensions[language.value],
            content: '',
            language: language.value
        },
        {
            type: 'test',
            filename: firstPart + 'Test' + extensions[language.value],
            content: '',
            language: language.value
        }
    ]

    emit('fileAdded', files);
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
                    <option value="javascript">Python</option>
                </select>
                <span class="italic">Un fichier de test sera automatiquement créé ! </span>
                <button type="submit" @click.stop.prevent="addFile" class="bg-primary-dark text-white rounded p-2">Ajouter</button>
            </form>
        </div>
    </div>
</template>