<script setup>
import { useAdmin } from '@/composables/admin'
import { onMounted, ref } from 'vue'

const { getUsers, deleteUser, deleteUnusedImages } = useAdmin()
const users = ref([])
const loading = ref(true)

const role = (id) => {
    switch (id) {
        case 0:
            return 'Etudiant'
        case 10:
            return 'Enseignant'
        case 100:
            return 'Admin'
        default:
            return 'Unknown'
    }
}

const deleteUserById = async (id) => {
    await deleteUser(id)
    users.value = users.value.filter(user => user.id !== id)
}

const handleDeleteUnusedImages = async () => {
    await deleteUnusedImages()
}

onMounted(async () => {
    users.value = await getUsers()
    loading.value = false
})
</script>

<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold mb-6">Gérer les utilisateurs</h1>
            <button
                @click="handleDeleteUnusedImages"
                class="px-3 py-1 text-white rounded bg-red-500 hover:bg-red-600 transition-colors"
            >
                <i class="fas fa-trash-alt"></i>
                Supprimer les photos de profil inutilisées
            </button>

        </div>
        <div class="bg-white dark:bg-background-dark rounded-lg shadow">
            <div class="grid grid-cols-4 gap-4 p-4  font-semibold border-b">
                <div>Nom</div>
                <div>Prénom</div>
                <div>Rôle</div>
                <div>Actions</div>
            </div>
            <!-- Skeleton Loader -->
            <div v-if="loading" class="divide-y">
                <div v-for="n in 6" :key="n" class="grid grid-cols-4 gap-4 p-4 items-center">
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/5 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                </div>
            </div>
            <div v-else class="divide-y">
                <div v-for="user in users" 
                     :key="user.id" 
                     class="grid grid-cols-4 gap-4 p-4 items-center">
                    <div>{{ user.surname }}</div>
                    <div>{{ user.name }}</div>
                    <div>
                        <span class="px-2 py-1 text-sm rounded-full"
                              :class="{
                                'bg-blue-100 text-blue-800': user.role === 0,
                                'bg-green-100 text-green-800': user.role === 10,
                                'bg-purple-100 text-purple-800': user.role === 100
                              }">
                            {{ role(user.role) }}
                        </span>
                    </div>
                    <div>
                        <button 
                            @click="deleteUserById(user.id)"
                            :disabled="user.role === 100"
                            title="Supprimer l'utilisateur"
                            :class="['px-3 py-1 text-white rounded transition-colors', user.role === 100 ? 'cursor-not-allowed bg-red-900/95' : 'bg-red-500 hover:bg-red-600']"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>