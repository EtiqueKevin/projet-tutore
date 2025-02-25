<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    lesson: {
        type: Object,
        required: true
    },
    isLoggedIn: {
        type: Boolean,
        required: true
    },
    isTeacher: {
        type: Boolean,
        required: false,
        default: false
    }
})

const emit = defineEmits(['delete', 'update'])

</script>

<template>
    <div :key="lesson.id" class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-start gap-4">
            
            <!-- informations -->
            <div class="space-y-2 flex-grow">
                <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold text-black dark:text-white">
                        {{ lesson.name }}
                    </h3>
                    <span class="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                        Leçon {{ lesson.id }}
                    </span>
                </div>
                <p class="text-gray-600 dark:text-gray-300">
                    {{ lesson.description }}
                </p>
            </div>
            
            <!-- bouttons -->
            <div class="flex items-center gap-2 flex-shrink-0">
                <button 
                    v-if="isTeacher"
                    @click="emit('update')"
                    class="items-center gap-2 px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
                    title="Modifier la leçon"
                >
                    <i class="fas fa-edit"></i>
                    <span>Modifier</span>
                </button>

                <button 
                    v-if="isTeacher"
                    @click="emit('delete')"
                    class="items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-800 text-white"
                    title="Supprimer la leçon"
                >
                    <i class="fas fa-trash"></i>
                    <span>Supprimer</span>
                </button>
            
                <button 
            :class="[
            'inline-flex items-center gap-2 px-4 py-2 rounded-md',
            isLoggedIn 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
            ]"
            @click="router.push({ name: 'lesson-by-id', params: { id: lesson.id } })"
            >
            <span class="hidden sm:inline">{{ isLoggedIn ? 'Commencer la leçon' : 'Se connecter' }}</span>
            <span class="sm:hidden">{{ isLoggedIn ? 'Commencer' : 'Login' }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
                </button>
            </div>
        </div>
    </div>
</template>