<script setup>
defineProps({
    isLoading: {
        type: Boolean,
        required: true
    },
    module: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="bg-background-light dark:bg-background-dark shadow rounded-lg p-6 mb-6">
        <!-- Skeleton loader -->
        <div v-if="isLoading" class="flex justify-between items-start">
            <div class="space-y-4 flex-1">
                <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-2/3 animate-pulse"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 animate-pulse"></div>
            </div>
            <div class="space-y-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-32 animate-pulse"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24 animate-pulse"></div>
            </div>
        </div>

        <!-- Actual content -->
        <div v-else class="flex justify-between items-start">
            <div>
                <h1 class="text-3xl font-bold mb-2 text-black dark:text-white">
                    {{ module.name }}
                </h1>
                <p class="text-gray-600 mb-4 text-gray-500 dark:text-gray-400">
                    {{ module.description }}
                </p>
            </div>
            <div class="text-right text-black dark:text-white">
                <p class="text-sm">
                    Mis à jour le : {{ new Date(module.lastUpdate).toLocaleDateString() }}
                </p>
                <p class="text-sm">
                    Crée par: {{ module.creator }}
                </p>
            </div>
        </div>
    </div>
</template>