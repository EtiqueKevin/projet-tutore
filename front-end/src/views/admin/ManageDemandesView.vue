<script setup>
import { useAdmin } from '@/composables/admin'
import { useToast } from 'vue-toastification'
import { onMounted, ref } from 'vue'

const { getDemandes, deleteDemande, validateDemande } = useAdmin()
const demandes = ref([])
const loading = ref(true)
const toast = useToast()

const handleDelete = async (id) => {
    const res = await deleteDemande(id)
    if(res) {
        toast.success('Demande supprimée avec succès')
        demandes.value = demandes.value.filter(demande => demande.id !== id)
    }else{
        toast.error('Erreur lors de la suppression de la demande')
    }
}

const handleValidate = async (id) => {
    const res = await validateDemande(id)
    if(res) {
        toast.success('Demande validée avec succès')
        demandes.value = demandes.value.filter(demande => demande.id !== id)
    }else{
        toast.error('Erreur lors de la validation de la demande')
    }
}

onMounted(async () => {
    demandes.value = await getDemandes()
    loading.value = false
})
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Demandes pour devenir profésseur</h1>
        <div class="bg-white dark:bg-background-dark rounded-lg shadow">
            <div class="grid grid-cols-3 gap-4 p-4  font-semibold border-b">
                <div>Nom</div>
                <div>Prénom</div>
                <div>Actions</div>
            </div>
            <!-- Skeleton Loader -->
            <div v-if="loading" class="divide-y">
                <div v-for="n in 6" :key="n" class="grid grid-cols-4 gap-4 p-4 items-center">
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                </div>
            </div>
            <div v-else class="divide-y">
                <div v-for="demande in demandes" 
                     :key="demande.id" 
                     class="grid grid-cols-3 gap-4 p-4 items-center">
                    <div>{{ demande.user.surname }}</div>
                    <div>{{ demande.user.name }}</div>
                    <div class="flex items-center space-x-4 md:flex-col md:space-x-0 md:space-y-4">
                        <button 
                            @click="handleValidate(demande.id)"
                            title="Valider la demande"
                            :class="['px-3 py-1 text-white rounded transition-colors bg-secondary-dark hover:bg-secondary-light']"
                        >
                            <i class="fas fa-check"></i>
                            Valider la demande
                        </button>
                        <button 
                            @click="handleDelete(demande.id)"
                            title="Supprimer la demande"
                            :class="['px-3 py-1 text-white rounded transition-colors bg-red-500 hover:bg-red-600']"
                        >
                            <i class="fas fa-trash"></i>
                            Supprimer la demande
                        </button>
                    </div>
                </div>
                <div v-if="demandes.length === 0" class="p-4 text-center">Aucune demande</div>
            </div>
        </div>
    </div>
</template>