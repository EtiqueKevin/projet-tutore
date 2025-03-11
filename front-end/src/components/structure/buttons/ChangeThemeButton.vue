<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user' 

const props = defineProps({
  showText : {
    type: Boolean,
    Required: false,
    default: true
  }
});

const userStore = useUserStore();
const isDark = ref(true);

const toggleDark = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark', isDark.value);
};

onMounted(() => {
  const preferences = userStore.getPreferences;
  isDark.value = preferences.themeDark;
});

watch(isDark, (newTheme) => {
  const preferences = userStore.getPreferences;
  preferences.themeDark = newTheme;
  userStore.setPreferences(preferences);
});

</script>

<template>
  <button 
    class="toggle-button" 
    :class="{ 'dark-mode': isDark }" 
    :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
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
  gap: 1rem;
  font-weight: bold;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  color: black;
}

.toggle-button.toggle-button.dark-mode {
  color: white;
}

.toggle-button i {
  transition: transform 0.3s;
  font-size: 1.5rem
}

.toggle-button.dark-mode i {
  transform: rotate(360deg);
}
</style>