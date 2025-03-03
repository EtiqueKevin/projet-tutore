<script setup>
import { onMounted, ref } from 'vue';

const emit = defineEmits(['fileSelected']);

const props = defineProps({
    files: Array
});

const selectedFile = ref(null);

const selectFile = (file, index) => {
    selectedFile.value = file;
    emit('fileSelected', { file, index });
};

onMounted(() => {
    selectedFile.value = props.files[0];
    emit('fileSelected', { file: selectedFile.value, index: 0 });
});
</script>

<template>
    <div class="file-switcher flex gap-4 p-4 pt-0 bg-main-light dark:bg-main-dark">
        <button
            v-for="(file, index) in files"
            :key="file.filename"
            @click="selectFile(file, index)"
            :class="['file-button', file === selectedFile ? 'selected' : '']"
        >
            {{ file.filename }}
        </button>
    </div>
</template>

<style scoped>
.file-button {
    @apply px-4 py-2 rounded-b-lg transition-colors bg-gray-800 text-white border-none cursor-pointer;
}

.file-button.selected {
    @apply bg-primary-dark text-white;
}
</style>
