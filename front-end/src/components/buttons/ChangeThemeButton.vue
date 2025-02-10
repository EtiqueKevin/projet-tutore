<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  showText : {
    type: Boolean,
    Required: false,
    default: true
  }
});

const isDark = ref(true);

const toggleDark = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark', isDark.value);
};

onMounted(() => {
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.classList.toggle('dark', isDark.value);
});

</script>

<template>
  <button 
    class="toggle-button" 
    :class="{ 'dark-mode': isDark }" 
    @click="toggleDark"
  >
    <i :class="isDark ? 'fas fa-moon' : 'fas fa-sun'"></i>
    <template v-if="showText">
      {{ isDark ? 'Dark Mode' : 'Light Mode' }}
    </template>
  </button>
</template>

<style scoped>
.toggle-button {
  display: flex;
  align-items: center;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  color: black;
}

.toggle-button.toggle-button.dark-mode {
  color: white;
}

.toggle-button:hover {
  transform: scale(1.05);
}

.toggle-button.dark-mode:hover {
  transform: scale(1.05);
}

.toggle-button i {
  transition: transform 0.3s;
  font-size: 1.5rem
}

.toggle-button.dark-mode i {
  transform: rotate(360deg);
}
</style>