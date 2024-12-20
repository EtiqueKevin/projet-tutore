<script setup>
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';

const isOpen = ref(false);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const handleClickInside = (event) => {
  isOpen.value = false;
};

</script>

<template>
    <div class="relative inline-block text-left">
      <div>
        <button @click="toggleDropdown" class="border-none p-2 rounded">
          <i :class="`fas ${isOpen ? 'fa-chevron-down' : 'fa-bars'} ml-2 text-3xl`"></i>
        </button>
      </div>
      <transition name="dropdown">
        <div v-if="isOpen" class="dropdown-content h-auto flex flex-col gap-4 bg-gray-800 absolute right-0 transform-x-2 mt-2 p-5 z-10" @click="handleClickInside">
          <slot></slot>
        </div>
      </transition>
    </div>
</template>

<style scoped>
.icon-transition {
  transition: transform 0.5s, opacity 0.5s;
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>