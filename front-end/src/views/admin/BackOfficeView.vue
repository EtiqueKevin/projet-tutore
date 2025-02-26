<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <div class="grid grid-cols-[250px_1fr] min-h-screen">
    <nav class="bg-background-light dark:bg-background-dark p-4 flex flex-col gap-4 shadow-md">
      <h1 class="text-center text-black dark:text-white pb-4 border-b-2 border-secondary-light dark:border-secondary-dark">Back Office</h1>
      
      <RouterLink 
        to="/admin/users"
        class="text-black dark:text-white hover:text-secondary-light dark:hover:text-secondary-light p-2 rounded flex items-center gap-2 hover:scale-105 transition-transform">
        <i class="fas fa-list w-5 text-center"></i>
        <span>Gérer les utilisateurs</span>
      </RouterLink>

      <RouterLink 
        to="/admin/modules"
        class="text-black dark:text-white hover:text-secondary-light dark:hover:text-secondary-light p-2 rounded flex items-center gap-2 hover:scale-105 transition-transform">
        <i class="fas fa-th-large w-5 text-center"></i>
        <span>Gérer le contenu</span>
      </RouterLink>
      
      <RouterLink 
        to="/" 
        class="mt-auto text-black dark:text-white hover:text-secondary-light dark:hover:text-secondary-light p-2 rounded flex items-center gap-2 hover:scale-105 transition-transform">
        <i class="fas fa-arrow-left w-5 text-center"></i>
        <span>Retour au Menu</span>
      </RouterLink>
    </nav>
    
    <div class="p-8 overflow-y-auto text-main-dark dark:text-main-light">
      <div v-if="route.path === '/admin'" class="text-center p-8">
        <h2 class="text-primary-light dark:text-primary-light mb-4">Bienvenue dans l'espace administrateur</h2>
        <p class="text-main-dark dark:text-main-light text-lg">Sélectionnez une option dans le menu pour commencer la gestion.</p>
      </div>
      <RouterView v-else />
    </div>
  </div>
</template>