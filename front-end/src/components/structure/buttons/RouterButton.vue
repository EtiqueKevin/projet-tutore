<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
    to: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false,
        default: ''
    },
    hover: {
        type: String,
        required: false,
        default: "hover:text-primary-dark dark:hover:text-primary-light hover:scale-105"
    },
    other: {
        type: String,
        required: false,
        default: ''
    }
});
</script>

<template>
    <RouterLink 
        :to="to" 
        :title="title" 
        :class="`${hover} ${other} font-bold text-lg text-center transform dark:text-white text-main-dark`"
    >
        <slot></slot>
    </RouterLink>
</template>