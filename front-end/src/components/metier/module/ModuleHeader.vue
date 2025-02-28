<script setup>
import  { useStudent } from '@/composables/student'
import { computed, watch } from 'vue'
import { useToast } from 'vue-toastification'

const { rateModule } = useStudent()
const toast = useToast()

const props = defineProps({ 
    isLoading: {
        type: Boolean,
        required: true
    },
    module: {
        type: Object,
        required: true
    },
    isUserLogged: {
        type: Boolean,
        required: true
    },
    isTeacher: {
        type: Boolean,
        required: false,
        default: false
    }
})

const emit = defineEmits(['rate'])

const handleRating = async (rating) => {
    const res = await rateModule(props.module.id, rating)
    if(res) {
        toast.success('Note enregistrée')
    }else{
        toast.error('Erreur lors de l\'enregistrement de la note')
    }
}

const isStarted = computed(() => {
    return props.module.status && props.module.status !== 2;
})
</script>

<template>
    <div class="bg-white dark:bg-background-dark shadow rounded-lg p-6 mb-6">
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

        <!-- Contenu -->
        <div v-else class="flex justify-between items-start">
            <div>
                <h1 class="text-3xl font-bold mb-2 text-black dark:text-white">
                    {{ module.name }}
                </h1>
                <p class="text-gray-600 mb-4 text-gray-500 dark:text-gray-400">
                    {{ module.description }}
                </p>
                <div class="relative inline-flex items-center">
                    <!-- Système d'étoiles -->
                    <div class="stars-container interactive overflow-hidden">
                        <div class="stars-background">
                            <i v-for="i in 5" :key="`bg-${i}`" class="fas fa-star"></i>
                        </div>
                        <div class="stars-foreground" :style="{ width: (module.note * 20) + '%' }">
                            <i v-for="i in 5" :key="`fg-${i}`" class="fas fa-star"></i>
                        </div>
                        <div class="stars-interactive" v-if="isUserLogged && isStarted">
                            <i v-for="i in 5" 
                               :key="`int-${i}`" 
                               class="fas fa-star"
                               :title="`Donner une note de ${i} étoile(s)`"
                               @click="handleRating(i)"
                               @mouseenter="$event.target.parentElement.style.width = (i * 20) + '%'"
                               @mouseleave="$event.target.parentElement.style.width = ''">
                            </i>
                        </div>
                    </div>
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">({{ module.note }})</span>
                </div>
            </div>
            <div class="text-right text-black dark:text-white">
                <p class="text-sm">
                    Mis à jour le : {{ module.lastUpdate }}
                </p>
                <p class="text-sm">
                    Crée par: {{ module.creator }}
                </p>
                <button v-if="isTeacher" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md mt-4">
                    <i class="fas fa-edit"></i>
                    <span>Modifier</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.barre-progression {
    width: 100px;
    height: 10px;
    background-color: #f3f3f3;
}

.stars-container {
    position: relative;
    display: inline-block;
}

.stars-background {
    color: #f3f3f3;
}

.stars-foreground {
    position: absolute;
    top: 0;
    left: 0;
    color: #fbbf24;
    overflow: hidden;
    white-space: nowrap;
}

.stars-container.interactive {
    cursor: pointer;
}

.stars-interactive {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
}

.stars-interactive:hover {
    opacity: 0.5;
    color: #fbbf24;
}

.stars-background i,
.stars-foreground i,
.stars-interactive i {
    font-size: 1.25rem;
    margin-right: 2px;
}
</style>