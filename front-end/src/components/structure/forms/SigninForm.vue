<script setup>
import { ref, computed } from 'vue'
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

const formValid = computed(() => {
    return password.value && email.value
})

const handleSubmit = async () => {
    if (!formValid.value) return
    const success = await userStore.signIn(email.value, password.value);
    lessonStore.setActiveUser(email.value);
    if (success) {
        const redirectPath = router.currentRoute.value.redirectedFrom?.name || 'home';
        const redirectParams = router.currentRoute.value.redirectedFrom?.params || {};
        router.push({
            name: redirectPath,
            params: redirectParams
        });
    }
};
</script>


<template>
    <div class="form-container">
        <div class="logo-container">
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
        </div>
        <h1 class="title">Connexion</h1>
        <form 
            @submit.prevent="handleSubmit" 
            class="form"
            name="signin-form"
            id="signin-form"
            autocomplete="on"
        >
            <InputField
                v-model="email"
                type="email"
                id="email"
                name="email"
                required
                autocomplete="username"
                placeholder="Email"
                class="input-field"
            />
            <PasswordInputField
                v-model="password"
                id="password"
                name="password"
                required
                autocomplete="current-password"
                placeholder="Mot de passe"
                class="input-field"
            />
            <button 
                type="submit" 
                class="submit-button" 
                :disabled="!formValid"
                :class="{ 
                    'disabled': !formValid,
                    'enabled': formValid
                }"
                title="Se connecter"
            >  
                Se connecter
            </button>
        </form>
        <button @click="$emit('switch-form')" class="foot-button" title="S'inscrire">
            Pas encore de compte ? S'inscrire
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

/* Add these animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.form-container {
    animation: fadeIn 0.5s ease-out;
}
</style>