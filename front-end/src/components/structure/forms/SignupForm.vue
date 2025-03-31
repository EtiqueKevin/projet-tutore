<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { useLessonStore } from '@/stores/lesson';
import InputField from '@/components/structure/forms/inputs/InputField.vue'
import PasswordInputField from '@/components/structure/forms/inputs/PasswordInputField.vue';

const router = useRouter();
const userStore = useUserStore();
const lessonStore = useLessonStore();

const email = ref('');
const password = ref('');
const password2 = ref('');
const name = ref('');
const surname = ref('');
const pseudo = ref('');
const passwordsMatch = ref(true);

const formValid = computed(() => {
    return passwordsMatch.value && 
           password.value && 
           email.value &&
           name.value &&
           surname.value &&
           pseudo.value
})

watch([password, password2], ([newPass, newPass2]) => {
    passwordsMatch.value = !newPass2 || newPass === newPass2
})

const handleSubmit = async () => {
    if (!formValid.value) return
    const userData = {
            email: email.value,
            mdp: password.value,
            name: name.value,
            surname: surname.value,
            pseudo: pseudo.value
        };
        
        const success = await userStore.signUp(userData);
        lessonStore.setActiveUser(userData.email);
        if (success) {
            const redirectPath = router.currentRoute.value.redirectedFrom?.name || 'home';
        const redirectParams = router.currentRoute.value.redirectedFrom?.params || {};
        router.push({
            name: redirectPath,
            params: redirectParams
        });
        }
}
</script>

<template>
    <div class="form-container">
        <div class="logo-container">
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
        </div>
        <h1 class="title">Inscription</h1>
        <form @submit.prevent="handleSubmit" class="form">
            <InputField
                v-model="name"
                type="text"
                id="name"
                required
                placeholder="Nom"
                class="input-field"
            />
            <InputField
                v-model="surname"
                type="text"
                id="surname"
                required
                placeholder="Prénom"
                class="input-field"
            />
            <InputField
                v-model="pseudo"
                type="text"
                id="pseudo"
                required
                placeholder="Pseudo"
                class="input-field"
            />
            <InputField
                v-model="email"
                type="email"
                id="email"
                required
                autocomplete="email"
                placeholder="Email"
                class="input-field"
            />
            <PasswordInputField
                v-model="password"
                id="password"
                required
                autocomplete="new-password"
                placeholder="Mot de passe"
                class="input-field"
            />
            <div class="space-y-2">
                <PasswordInputField
                    v-model="password2"
                    id="password2"
                    required
                    autocomplete="new-password"
                    placeholder="Confirmer le mot de passe"
                    class="input-field"
                    :class="{ 
                        'invalid-input': !passwordsMatch && password2, 
                        'valid-input': passwordsMatch && password2 
                    }"
                />
                <div v-if="!passwordsMatch && password2" class="text-red-500 text-sm">
                    Les mots de passe ne correspondent pas
                </div>
            </div>
            <button 
                type="submit" 
                class="submit-button" 
                :disabled="!formValid"
                :class="{ 
                    'disabled': !formValid,
                    'enabled': formValid
                }"
                title="S'inscrire"
            >    
                S'inscrire
            </button>
        </form>
        <button @click="$emit('switch-form')" class="foot-button" title="Se connecter">
            Déjà un compte ? Se connecter
        </button>
    </div>
</template>

<style scoped>
.form-container {
    @apply bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto
    transform transition-all duration-300;
}

.logo-container {
    @apply flex justify-center mb-6;
}

.logo {
    @apply w-24 h-auto object-contain;
}

.title {
    @apply text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white;
}

.form {
    @apply space-y-6;
}

.input-field {
    @apply transition-all duration-300 hover:shadow-md focus-within:shadow-md;
}

.invalid-input {
    @apply border-red-500 focus:border-red-500 focus:ring-red-500;
}

.valid-input {
    @apply border-green-500 focus:border-green-500 focus:ring-green-500;
}

.submit-button {
    @apply w-full py-3 px-6 rounded-lg font-semibold text-white
    transition-all duration-300 transform;
}

.submit-button.enabled {
    @apply bg-primary-dark hover:bg-primary-light
    hover:shadow-lg hover:scale-[1.02]
    active:scale-[0.98];
}

.submit-button.disabled {
    @apply bg-gray-400 cursor-not-allowed opacity-60;
}

.foot-button {
    @apply block w-full text-center mt-6 text-sm font-medium
    text-primary-dark hover:text-primary-light
    transition-colors duration-300
    dark:text-blue-400 dark:hover:text-blue-300;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.form-container {
    animation: fadeIn 0.5s ease-out;
}
</style>