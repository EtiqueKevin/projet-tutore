<script setup>
import { ref } from 'vue'

const email = ref('');
const password = ref('');
const password2 = ref('');
const connexion = ref(true);

const showPassword = ref(false);
const showPassword2 = ref(false);

const handleSubmit = () => {
    console.log('Email:', email.value)
    console.log('Password:', password.value)
};
</script>

<template>
    <main class="flex-grow flex justify-center items-start mt-20 px-4 sm:px-6 lg:px-8">
        <div v-if="connexion" class="dark:bg-gray-800 bg-slate-100 p-6 rounded-lg shadow-md w-full max-w-md sm:max-w-lg lg:max-w-xl">
            <h1 class="text-2xl font-bold mb-4">Connexion</h1>
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required autocomplete="email" />
                </div>
                <div class="relative text-black">
                    <label for="password">Password:</label>
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required autocomplete="current-password" />
                    <button type="button" @click="showPassword = !showPassword" class="absolute right-0 px-3 text-black transform top-1/2">
                        <i :class="['fas', showPassword? 'fa-eye': 'fa-eye-slash']"></i>
                    </button>
                </div>
                <button type="submit" class="submit-button">Submit</button>
            </form>
            <button @click.stop.prevent="connexion=false" class="foot-button">S'inscrire</button>
        </div>
        <div v-else class="dark:bg-gray-800 bg-slate-100 p-6 rounded-lg shadow-md w-full max-w-md sm:max-w-lg lg:max-w-xl">
            <h1 class="text-2xl font-bold mb-4">Inscription</h1>
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required autocomplete="email" class="email" />
                </div>
                <div class="relative text-black">
                    <label for="password">Password:</label>
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required autocomplete="new-password" />
                    <button type="button" @click="showPassword = !showPassword" class="absolute right-0 px-3 text-black transform top-1/2">
                        <i :class="['fas', showPassword? 'fa-eye': 'fa-eye-slash']"></i>
                    </button>
                </div>
                <div class="relative text-black">
                    <label for="password2">Confirm Password:</label>
                    <input :type="showPassword2 ? 'text' : 'password'" id="password2" v-model="password2" required autocomplete="new-password" />
                    <button type="button" @click="showPassword2 = !showPassword2" class="absolute right-0 px-3 text-black transform top-1/2">
                        <i :class="['fas', showPassword2? 'fa-eye': 'fa-eye-slash']"></i>
                    </button>
                </div>
                <button type="submit" class="submit-button">Submit</button>
            </form>
            <button @click.stop.prevent="connexion=true" class="foot-button">Se connecter</button>
        </div>
    </main>
</template>

<style scoped>
.foot-button {
    @apply text-blue-500 hover:text-blue-700 cursor-pointer underline mt-4;
}
input {
    @apply mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black;
}
label {
    @apply block text-sm font-medium text-black dark:text-white;
}
.submit-button {
    @apply w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-dark hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}
@media (min-width: 640px) {
    .submit-button {
        @apply py-3 px-6 text-base;
    }
}
</style>