<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import InputField from '@/components/structure/forms/inputs/InputField.vue';
import { onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const userStore = useUserStore();
const userProfile = ref({
    name: '',
    surname: '',
    pseudo: '',
    image: null
});

const imagePreview = ref(null);
const fileInput = ref(null);

const isEditing = ref(false);

const toggleEdit = () => {
    if (isEditing.value) {
        // Reset form when canceling
        userProfile.value = {
            name: userStore.name,
            surname: userStore.surname,
            pseudo: userStore.pseudo,
            image: null
        };
        imagePreview.value = null;
    }
    isEditing.value = !isEditing.value;
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        if(!file.type.includes('image')){
            toast.warning('Le fichier doit être une image');
            return;
        }

        if(!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){
            toast.warning('Le fichier doit être une image de type jpeg, jpg ou png');
            return;
        }
        
        if(file.size > 1000000){
            toast.warning('L\'image ne doit pas dépasser 1Mo');
            return;
        }

        userProfile.value.image = file;
        imagePreview.value = URL.createObjectURL(file);
    }
};

const saveProfile = async () => {
    if(!userProfile.value.name){
        toast.warning('Le prénom est requis');
        return;
    }
    if(!userProfile.value.surname){
        toast.warning('Le nom est requis');
        return;
    }
    if(!userProfile.value.pseudo){
        toast.warning('Le pseudo est requis');
        return;
    }

    try {
        const success = await userStore.updateProfile(userProfile.value);
        if (success) {
            isEditing.value = false;
            imagePreview = null
        }
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};

onMounted(() => {
    if(userStore.isInit){
        userProfile.value = {
            name: userStore.name,
            surname: userStore.surname,
            pseudo: userStore.pseudo,
            image: userStore.image
        };
    }
});


watch (() => userStore.isInit, (isInit) => {
    // afin de ne pas afficher les données de l'utilisateur avant qu'elles ne soient chargées si on va sur la page directement
    if (isInit) {
        userProfile.value = {
            name: userStore.name,
            surname: userStore.surname,
            pseudo: userStore.pseudo,
            image: userStore.image
        };
    }
});
</script>

<template>
    <main class="flex-grow p-6">
        <div class="max-w-2xl mx-auto bg-background-light dark:bg-background-dark rounded-lg shadow-md p-8" v-if="userStore.isInit">
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
                    <div class="relative flex flex-col space-y-2 items-center justify-center">
                        <div class="w-32 h-32 bg-white rounded-full flex items-center justify-center overflow-hidden">
                            <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
                            <img v-else="userProfile.image" :src="userProfile.image" class="w-full h-full object-cover" />
                        </div>
                        <input
                            v-if="isEditing"
                            type="file"
                            ref="fileInput"
                            @change="handleImageUpload"
                            accept="image/*"
                            class="hidden"
                        />
                        <button
                            v-if="isEditing"
                            @click="fileInput.click()"
                            class="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700"
                        >
                            <span>Changer image</span>
                        </button>
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

        <!-- skeleton loader -->
        <div v-else>
            <div class="animate-pulse flex space-x-4">
                <div class="flex-1 space-y-4 py-1">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
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