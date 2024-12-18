<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
    to: {
        type: String,
        required: true
    },
    hover: {
        type: String,
        required: false,
        default: "hover:bg-primary-dark dark:hover:bg-primary-light"
    },
    background: {
        type: String,
        required: false,
        default: 'bg-primary-light dark:bg-primary-dark'
    },
    other: {
        type: String,
        required: false,
        default: ''
    }
});
</script>

<template>
        <RouterLink :to="to" :class="`${background} ${hover} ${other} font-bold py-2 px-4 rounded text-center`">
                <slot></slot>
        </RouterLink>
</template>
