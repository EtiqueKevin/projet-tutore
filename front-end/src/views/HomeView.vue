<script setup>
import { ref } from 'vue';

const message = ref('Welcome to the Home Page!');
</script>

<template>
    <main class="flex-grow flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold mb-4 dark:text-white">{{ message }}</h1>
    </main>
</template>

<style scoped>

button {
    transition: background-color 0.3s;
}
</style>