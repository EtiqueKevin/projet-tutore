<script setup>
import { onMounted, ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useTeacher } from '@/composables/teacher';

const props = defineProps({
    module: {
        type: Object,
        required: false,
        default: null
    },
});

const { postModule, putModule } = useTeacher(); 
const emit = defineEmits(['quitter']);
const name = ref('')
const desc = ref('')


const handleSubmit = async () => {
    const toast = useToast()

    if(!props.module){
        const success = await postModule(name.value, desc.value)
        if(success){
            toast.success("Module créer avec succés")
            emit('quitter')
        }else{
            toast.error("Erreur lors de la création du module")
        }
    }else{
        const success = await putModule(props.module.id, name.value, desc.value, props.module.nblesson)
        if(success){
            toast.success("Module modifié avec succés")
            emit('quitter')
        }else{
            toast.error("Erreur lors de la modification du module")
        }
    }
}

const handleCancel = () => {
    emit('quitter')
}

const titre = computed(() => {
    return props.module ? `Modifier le module "${props.module.name}"` : 'Créer un module'
})

onMounted(() => {
    if (props.module) {
        name.value = props.module.name
        desc.value = props.module.description
    }
});
</script>

<template>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">{{titre}}</h1>
        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-4">
                <input 
                    id="moduleName"
                    v-model="name"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 dark:text-gray-100"
                    placeholder="Nom du module"
                >
                <textarea
                    id="moduleDescription"
                    v-model="desc"
                    required
                    class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 dark:text-gray-100"
                    placeholder="Description du module"
                ></textarea>
            </div>

            <div class="flex gap-4 mt-6">
        <button 
            type="submit"
            title="Enregistrer"
            class="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-sm
                   hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
                   flex items-center justify-center gap-2"
        >
            <i class="fas fa-download"></i>
            Enregistrer
        </button>
        <button
            type="button"
            @click="handleCancel"
            title="Annuler"
            class="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
                   text-gray-700 dark:text-gray-200 font-medium rounded-lg shadow-sm
                   hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                   flex items-center justify-center gap-2"
        >
            <i class="fas fa-xmark"></i>
            Annuler
        </button>
    </div>
        </form>
</template>