<script setup>
import { ref } from 'vue';

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
  gap: 10px;
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  background-color: #f0f0f0;
  color: #333;
}

.toggle-button.dark-mode {
  background-color: #4a4a4a;
  color: white;
}

.toggle-button:hover {
  background-color: #ddd;
  color: #111;
  transform: scale(1.05);
}

.toggle-button.dark-mode:hover {
  background-color: #333;
  color: #f0f0f0;
  transform: scale(1.05);
}

.toggle-button i {
  transition: transform 0.3s;
}

.toggle-button.dark-mode i {
  transform: rotate(180deg);
}
</style>