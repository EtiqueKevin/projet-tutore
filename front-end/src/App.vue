<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const checkTheme = () => {
  const preferences = userStore.getPreferences
  if (preferences.themeDark === null){
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
    userStore.setPreferences({themeDark: prefersDarkScheme.matches})
    document.body.classList.toggle('dark', prefersDarkScheme);
  }
  else {
    document.body.classList.toggle('dark', preferences.themeDark);
  }
}

onMounted(async () => {
  checkTheme() // stocker le theme du navigateur de l'utilisateur de la page (sauvegarder les préférences de theme pour plutard)
  await userStore.loadInfo()
})

</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
