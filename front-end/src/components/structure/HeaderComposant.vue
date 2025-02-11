<script setup>
import RouterButton from '@/components/buttons/RouterButton.vue';
import Button from '@/components/buttons/Button.vue';
import ChangeThemeButton from '@/components/buttons/ChangeThemeButton.vue';
import MenuList from '@/components/list/MenuList.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <header class="sticky top-0 z-50 backdrop-blur-sm shadow-lg
    dark:bg-background-dark/95 bg-background-light/95
    transition-colors duration-200">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-12">
        <!-- Logo -->
        <router-link to="/" 
          class="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity" 
          title="Retour a l'accueil">
          <img class="h-8 w-auto" src="@/assets/logo.png" alt="Logo" />
          <span class="ml-2 text-xl font-bold dark:text-white text-main-dark">Jeancadémie</span>
        </router-link>

        <!-- Navigation -->
        <div class="flex items-center space-x-4 h-full">
          <MenuList :show-icon="true" class="dark:text-white text-main-dark">
            <template #text>
              Menu
            </template>
            <RouterButton :to="'/exercice'" 
              class="dark:text-white text-main-dark hover:text-primary-dark dark:hover:text-primary-light"
              title="Voir les exercices">
              <i class="fas fa-dumbbell"></i>
              <span class="ml-2">Exercice</span>
            </RouterButton>
            <RouterButton :to="'/cours/create'" 
              class="dark:text-white text-main-dark hover:text-primary-dark dark:hover:text-primary-light"
              title="Créer un nouveau cours">
              <i class="fas fa-plus-circle"></i>
              <span class="ml-2">Create Cours</span>
            </RouterButton>
          </MenuList>

          <div class="separator"></div>

          <ChangeThemeButton :show-text="false" class="transform hover:scale-105 transition-transform" />

          <div class="separator"></div>
          
          <template v-if="!userStore.isLogged">
            <RouterButton :to="'/user/connect'" 
              class="dark:text-white text-main-dark hover:text-primary-dark dark:hover:text-primary-light"
              title="Se connecter">
              <i class="fas fa-power-off"></i>
            </RouterButton>
          </template>
          <template v-else>
            <RouterButton :to="'/user/profile'" 
              
              title="Mon profil">
              <i class="fas fa-user"></i>
            </RouterButton>
            <Button 
              @click="userStore.signOut()" 
              
              title="Se déconnecter">
              <i class="fas fa-sign-out-alt"></i>
            </Button>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.separator {
  @apply h-6 w-px transition-colors duration-200 dark:bg-gray-600 bg-gray-300;
}
</style>