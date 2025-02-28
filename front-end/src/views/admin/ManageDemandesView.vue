<script setup>
import { useAdmin } from '@/composables/admin'
import { onMounted, ref } from 'vue'

const { getDemandes } = useAdmin()
const demandes = ref([])
const loading = ref(true)

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
                    <div>
                        <button 
                            @click="console.log('Accepter demande')"
                            title="Valider la demande"
                            :class="['px-3 py-1 text-white rounded transition-colors bg-secondary-dark hover:bg-secondary-light']"
                        >
                            <i class="fas fa-check"></i>
                            Valider la demande
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>