<script setup>
import { onMounted, ref, watch } from 'vue';
import AddFileForm from '@/components/structure/forms/AddFileForm.vue';

const emit = defineEmits(['fileSelected']);

const props = defineProps({
    files: Array
});

const selectedFile = ref(null);
const showAddFileForm = ref(false);

const selectFile = (file, index) => {
    selectedFile.value = file;
    emit('fileSelected', { file, index });
};

const deleteFile = (file) => {
    const index = props.files.indexOf(file);
    if (index > -1) {
        props.files.splice(index, 1);
        
        if (file.type !== 'test') {
            // Delete associated test file (nameTest.ext)
            const testFilename = file.filename.replace(/^(.+)\.(.+)$/, '$1Test.$2');
            const testFile = props.files.find(f => 
                f.type === 'test' && 
                f.filename === testFilename
            );
            if (testFile) {
                const testIndex = props.files.indexOf(testFile);
                props.files.splice(testIndex, 1);
            }
        } else {
            // If deleting a test file, delete the associated source file
            const sourceFilename = file.filename.replace(/^(.+)Test\.(.+)$/, '$1.$2');
            const sourceFile = props.files.find(f => 
                f.type !== 'test' && 
                f.filename === sourceFilename
            );
            if (sourceFile) {
                const sourceIndex = props.files.indexOf(sourceFile);
                props.files.splice(sourceIndex, 1);
            }
        }

        if (selectedFile.value === file) {
            selectedFile.value = props.files[0];
            emit('fileSelected', { file: props.files[0], index: 0 });
        }
    }
};

const addFile = (files) => {
    const startIndex = props.files.length;
    props.files.push(...files);
    selectedFile.value = files[0];
    emit('fileSelected', { file: files[0], index: startIndex });
};

onMounted(() => {
    selectedFile.value = null;
    emit('fileSelected', { file: "", index: 0 });
});

watch(() => props.files, (newFiles) => {
    if (newFiles.length > 0) {
        selectedFile.value = newFiles[0];
        emit('fileSelected', { file: newFiles[0], index: 0 });
    }
}, { immediate: true });
</script>

<template>
    <div class="file-switcher-container">
        <div class="file-switcher flex gap-4 p-4 pt-0 bg-main-light dark:bg-main-dark">
            <div
                v-for="(file, index) in files"
                :key="file.filename"
                @click.prevent.stop="selectFile(file, index)"
                :class="['file-button', 
                     (file === selectedFile && file.type != 'test') ? 'selected' : '', 
                     (file === selectedFile && file.type === 'test') ? 'testselected' : '', 
                     file.type === 'test' ? 'bg-green-700' : 'bg-gray-500 dark:bg-gray-700']"
            >
                {{ file.filename }}
                <button
                    :key="file.filename + '-delete'"
                    @click.prevent.stop="deleteFile(file)"
                    class="delete-button hover:bg-red-500 w-6 h-6 rounded-full"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <button id="add-file" class="file-button bg-gray-500 dark:bg-gray-700" @click="showAddFileForm = true">
                <i class="fas fa-plus"></i>
            </button>
            <AddFileForm v-if="showAddFileForm" @fileAdded="addFile" @close="showAddFileForm = false" />
        </div>
    </div>
</template>

<style scoped>
.file-switcher-container {
    @apply w-full overflow-x-auto;
}

.file-switcher {
    @apply flex-nowrap min-w-min;
}

.file-button {
    @apply px-4 py-2 rounded-b-lg transition-colors text-white border-none cursor-pointer flex gap-2 whitespace-nowrap;
}

.selected {
    @apply bg-primary-dark text-white;
}

.testselected {
    @apply bg-green-500 text-white;
}
</style>