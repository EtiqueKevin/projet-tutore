<script setup>
import { useAdmin } from '@/composables/admin'
import { onMounted, ref } from 'vue'

const { getUsers, deleteUser } = useAdmin()
const users = ref([])

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

onMounted(async () => {
    users.value = await getUsers()
})
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Gérer les utilisateurs</h1>
        <div class="bg-white dark:bg-background-dark rounded-lg shadow">
            <div class="grid grid-cols-4 gap-4 p-4  font-semibold border-b">
                <div>Nom</div>
                <div>Prénom</div>
                <div>Rôle</div>
                <div>Actions</div>
            </div>
            <div class="divide-y">
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
                            title="Supprimer l'utilisateur"
                            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>