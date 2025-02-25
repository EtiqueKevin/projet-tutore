<script setup>
import { useTools } from '@/composables/tools';
import { useRouter } from 'vue-router';

const emit = defineEmits(['open', 'delete']);
const props = defineProps({
  module: {
    type: Object,
    required: true
  },
  canUpdate: {
    type: Boolean,
    required: false,
    default: false
  },
});

const router = useRouter();
const { formatDate } = useTools();

const openModule = (module) => {
  emit('open', module)
}

const deleteModule = (moduleId) => {
  emit('delete', moduleId)
}

const viewModule = (moduleId) => {
    if(props.canUpdate) {
        router.push(`/teacher/modules/${moduleId}`)
    } else {
        router.push(`/modules/${moduleId}`)
    }
}
</script>

<template>
    <div :key="module.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ module.name }}</h2>
            <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
                {{ module.nblesson }} leçons
            </span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ module.description }}</p>
        <div class="flex flex-col space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">
                Mis à jour le : {{ formatDate(module.dateupdate) }}
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700 space-x-4">
                <button 
                    @click="viewModule(module.id)"
                    class="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2"
                >
                    <i class="fas fa-eye"></i>
                    Voir le module
                </button>
                <button
                    v-if="canUpdate"
                    class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2"
                    @click="openModule(module)"
                >
                    <i class="fas fa-pencil"></i>
                    Modifier
                </button>
                <button
                    v-if="canUpdate"
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2"
                    @click="deleteModule(module.id)"
                >
                    <i class="fas fa-trash"></i>
                    Supprimer
                </button>
            </div>
        </div>
    </div>
</template>