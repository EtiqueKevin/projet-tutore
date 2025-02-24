<script setup>
const emit = defineEmits(['close']);

function closeModal() {
    emit('close');
}
</script>

<template>
    <div @click.self="closeModal" 
         class="fixed inset-0 z-50 w-full h-full overflow-auto bg-black bg-opacity-70 box-border">
        <div class="relative w-4/5 p-5 mx-auto mt-[10%] bg-white dark:bg-background-dark border border-gray-300">
            <button @click="closeModal" 
                    class="absolute top-2.5 right-2.5 text-2xl bg-transparent border-none cursor-pointer text-black dark:text-white">
                <i class="fas fa-times"></i>
            </button>
            <slot></slot>
        </div>
    </div>
</template>