<script setup>
import { ref } from 'vue';

const props = defineProps({
  upIcon: {
    type: String,
    default: 'fa-chevron-up'
  },
  downIcon: {
    type: String,
    default: 'fa-chevron-down'
  },
  showIcon: {
    type: Boolean,
    default: true
  }
});

const isHovered = ref(false);
</script>

<template>
  <div 
    class="relative h-full"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <button 
      class="flex items-center h-full px-4 duration-200 
        dark:hover:text-primary-light hover:text-primary-dark 
        dark:text-white text-main-dark"
    >
      <slot name="button-content">
        <span class="hover:underline">
          <slot name="text"></slot>
        </span>
        <slot name="icon" :is-hovered="isHovered" v-if="showIcon">
          <i :class="`fas ${isHovered ? upIcon : downIcon} text-xl ml-2`"></i>
        </slot>
      </slot>
    </button>
    
    <transition
      enter-active-class="transition-all duration-300 ease-out delay-75"
      enter-from-class="transform opacity-0 -translate-y-4"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-4"
    >
      <div 
        v-if="isHovered"
        class="fixed top-12 right-0 left-0 
          dark:bg-background-dark/95 bg-background-light/95 
          backdrop-blur-sm p-4 flex justify-center gap-4 
          sm:flex-row sm:items-center flex-col items-center z-50 
          dark:border-gray-700 border-gray-300 border-t"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>