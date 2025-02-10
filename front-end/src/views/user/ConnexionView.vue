<script setup>
import { ref } from 'vue'
import SigninForm from '@/components/forms/SigninForm.vue';
import SignupForm from '@/components/forms/SignupForm.vue';

const connexion = ref(true);
</script>

<template>
    <main class="flex-grow flex justify-center items-start mt-20 px-4 sm:px-6 lg:px-8 ">
        <SigninForm v-if="connexion" @switch-form="connexion = false" />
        <SignupForm v-else @switch-form="connexion = true" />
    </main>
</template>