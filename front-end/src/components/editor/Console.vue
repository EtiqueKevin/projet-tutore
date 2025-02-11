<script setup>
const props = defineProps({
    results: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="p-4 dark:text-white shadow-md bg-slate-300 dark:bg-gray-900">
        <h2 class="text-lg font-bold mb-2">Console</h2>
        <pre class="whitespace-pre-wrap break-words">{{ results }}</pre>
    </div>
</template>

<style scoped>
</style>