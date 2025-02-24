<script setup>
import { ref } from 'vue';
import RouterButton from '@/components/structure/buttons/RouterButton.vue';
import Button from '@/components/structure/buttons/Button.vue';
import ChangeThemeButton from '@/components/structure/buttons/ChangeThemeButton.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const isMobileMenuOpen = ref(false);

const logOut = async () => {
  await router.push('/');
  userStore.signOut();
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <header class="sticky top-0 z-50 backdrop-blur-sm shadow-lg
                dark:bg-background-dark/95 bg-background-light/95
                transition-colors duration-200">
    <nav class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-12">
        <!-- Logo -->
        <router-link to="/" 
                     class="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity" 
                     title="Retour a l'accueil">
          <img class="h-8 w-auto" src="@/assets/logo.png" alt="Logo" />
          <span class="ml-2 text-xl font-bold dark:text-white text-main-dark">Jeancadémie</span>
        </router-link>

        <!-- Mobile menu button -->
        <button @click="toggleMobileMenu" 
                class="md:hidden inline-flex items-center justify-center p-2 rounded-md dark:text-white text-main-dark 
                       hover:text-primary-dark dark:hover:text-primary-light focus:outline-none">
          <span class="sr-only">Open main menu</span>
          <i :class="[isMobileMenuOpen ? 'fa-times' : 'fa-bars', 'fas']"></i>
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4 h-full">
          <!-- Modules button visible to all logged users -->
          <RouterButton :to="'/modules'" title="Voir les modules">
            <div class="flex items-center space-x-2">
              <i class="fas fa-th-large"></i>
              <span>Modules</span>
            </div>
          </RouterButton>

          <!-- Bouton créer cours pour professeurs et administrateurs -->
          <RouterButton v-if="userStore.isTeacher"
                       :to="'/teacher/modules'" 
                       class="block w-full text-left px-4 py-2 dark:text-white text-main-dark 
                              hover:text-primary-dark dark:hover:text-primary-light"
                       title="Gérer mes modules">
            <i class="fas fa-book"></i>
            <span class="ml-2">Mes modules</span>
          </RouterButton>

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
          <div v-else class="flex items-center space-x-6">
            <RouterButton :to="'/admin'"
                         v-if="userStore.isAdmin"
                         title="Accéder au Back Office" 
                         class="dark:text-white text-main-dark hover:text-primary-dark dark:hover:text-primary-light">
              <i class="fas fa-cog"></i>
            </RouterButton>
            <RouterButton :to="'/user/profile'" title="Mon profil">
              <i class="fas fa-user"></i>
            </RouterButton>
            <Button @click="logOut()" title="Se déconnecter">
              <i class="fas fa-sign-out-alt"></i>
            </Button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
<!-- Mobile menu -->
<div :class="[isMobileMenuOpen ? 'block' : 'hidden', 'md:hidden']"
     class="absolute top-12 left-0 right-0 bg-background-light/95 dark:bg-background-dark/95 
            backdrop-blur-sm shadow-lg border-t dark:border-gray-700 border-gray-200">
  <div class="py-3 space-y-1">
    <!-- Navigation principale -->
    <RouterButton :to="'/modules'" 
                class="flex items-center w-full px-4 py-3 dark:text-white text-main-dark 
                      hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                 title="Voir les modules">
        <i class="fas fa-th-large w-6"></i>
        <span class="ml-3">Modules</span>
    </RouterButton>

    <!-- Bouton créer cours pour professeurs et administrateurs -->
    <RouterButton v-if="userStore.isTeacher"
                 :to="'/teacher/modules'" 
                 class="flex items-center w-full px-4 py-3 dark:text-white text-main-dark 
                        hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                 title="Gérer mes modules">
      <i class="fas fa-book w-6"></i>
      <span class="ml-3">Mes modules</span>
    </RouterButton>

    <!-- Séparateur -->
    <div class="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

    <!-- Thème -->
    <div class="px-4 py-3">
      <ChangeThemeButton :show-text="true" class="w-full" />
    </div>

    <!-- Séparateur -->
    <div class="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

    <!-- Actions Utilisateur -->
    <template v-if="!userStore.isLogged">
      <RouterButton :to="'/user/connect'" 
                   class="flex items-center w-full px-4 py-3 dark:text-white text-main-dark 
                          hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                   title="Se connecter">
        <i class="fas fa-power-off w-6"></i>
        <span class="ml-3">Se connecter</span>
      </RouterButton>
    </template>

    <!-- Actions Utilisateur Connecté -->
    <template v-else>
      <RouterButton v-if="userStore.isAdmin" :to="'/admin'"
                   class="flex items-center w-full px-4 py-3 dark:text-white text-main-dark 
                          hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                   title="Accéder au Back Office">
        <i class="fas fa-cog w-6"></i>
        <span class="ml-3">Administration</span>
      </RouterButton>
      <RouterButton :to="'/user/profile'" 
                   class="flex items-center w-full px-4 py-3 dark:text-white text-main-dark 
                          hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                   title="Mon profil">
        <i class="fas fa-user w-6"></i>
        <span class="ml-3">Mon profil</span>
      </RouterButton>
      <Button @click="logOut()" 
             class="flex items-center w-full px-4 py-3 dark:text-white text-main-dark 
                    hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
             title="Se déconnecter">
        <i class="fas fa-sign-out-alt w-6"></i>
        <span class="ml-3">Se déconnecter</span>
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