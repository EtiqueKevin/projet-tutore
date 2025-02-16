<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import InputField from '@/components/structure/forms/inputs/InputField.vue';

const userStore = useUserStore();

const userProfile = {
    name: '',
    surname: '',
    pseudo: '',
}

const isEditing = ref(false);

const isInit = ref(false);

const toggleEdit = () => {
    isEditing.value = !isEditing.value;
};

const saveProfile = () => {
    try {
        isEditing.value = false;
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};

onMounted(async () => {
    userProfile.name = userStore.name;
    userProfile.surname = userStore.surname;
    userProfile.pseudo = userStore.pseudo;
    isInit.value = true;
});
</script>

<template>
    <main class="flex-grow p-6">
        <div class="max-w-2xl mx-auto bg-background-light dark:bg-background-dark rounded-lg shadow-md p-8" v-if="isInit">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-black dark:text-white">Profile</h1>
                <button
                    @click="toggleEdit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    {{ isEditing ? 'Annuler' : 'Modifier' }}
                </button>
            </div>

            <div class="space-y-6">

                <div class="flex justify-center">
                    <div class="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                        <span class="text-4xl text-black">
                            {{ userProfile.name[0] }}{{ userProfile.surname[0] }}
                        </span>
                    </div>
                </div>


                <div class="space-y-4">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-black dark:text-white">Prenom</label>
                            <InputField
                                v-if="isEditing"
                                v-model="userProfile.name"
                                type="text"
                                :placeholder="userProfile.name"
                                required
                            />
                            <p v-else class="p-2 bg-gray-50 rounded-md">{{ userProfile.name }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium text-black dark:text-white">Nom</label>
                            <InputField
                                v-if="isEditing"
                                v-model="userProfile.surname"
                                type="text"
                                :placeholder="userProfile.surname"
                                required
                            />
                            <p v-else class="p-2 bg-gray-50 rounded-md">{{ userProfile.surname }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium text-black dark:text-white">Pseudo</label>
                            <InputField
                                v-if="isEditing"
                                v-model="userProfile.pseudo"
                                type="text"
                                :placeholder="userProfile.pseudo"
                                required
                            />
                            <p v-else class="p-2 bg-gray-50 rounded-md">{{ userProfile.pseudo }}</p>
                        </div>

                    </div>

                    <!-- Save Button -->
                    <div v-if="isEditing" class="flex justify-end mt-6">
                        <button
                            @click="saveProfile"
                            class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            Sauvegarder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.transition-colors {
    transition: background-color 0.2s ease-in-out;
}
</style>