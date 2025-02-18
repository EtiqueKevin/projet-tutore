<script setup>
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
    <button 
        @click="scrollToTop" 
        class="fixed bottom-10 right-5 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors duration-300 z-50" 
        id="return-top-button"
    >
        <i class="fas fa-arrow-up"></i>
    </button>
</template>