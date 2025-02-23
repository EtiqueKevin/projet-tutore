<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: ''
    },
    hover: {
        type: String,
        required: false,
        default: "hover:text-primary-dark dark:hover:text-primary-light"
    },
    other: {
        type: String,
        required: false,
        default: ''
    }
});
</script>

<template>
    <button 
        :title="title" 
        :class="`
            ${hover} 
            ${other} 
            font-bold
            text-center 
            transition duration-200 
            transform hover:scale-105 
            dark:text-white text-main-dark
        `"
    >
        <slot></slot>
    </button>
</template>