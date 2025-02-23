<script setup>
import RouterButton from '@/components/structure/buttons/RouterButton.vue';
import Button from '@/components/structure/buttons/Button.vue';
import ChangeThemeButton from '@/components/structure/buttons/ChangeThemeButton.vue';
import MenuList from '@/components/structure/list/MenuList.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const logOut = async () => {
  await router.push('/');
  userStore.signOut();
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

        <!-- Navigation -->
        <div class="flex items-center space-x-4 h-full">
          <!-- Modules button visible to all logged users -->
          <RouterButton :to="'/modules'" title="Voir les modules">
            <div class="flex items-center space-x-2">
              <span>Modules</span>
              <i class="fas fa-th-large"></i>
            </div>
          </RouterButton>

          <!-- Espace visible aux étudiants -->
          <MenuList :show-icon="true" v-if="userStore.isLogged" class="dark:text-white text-main-dark">
            <template #text>
              Espace étudiant
            </template>
            <p>Rien pour l'instant</p>
          </MenuList>

          <!-- Espace visible aux professeurs et administrateurs -->
          <MenuList :show-icon="true" v-if="userStore.isTeacher || userStore.isAdmin" class="dark:text-white text-main-dark">
            <template #text>
              Espace professeur
            </template>
            <RouterButton :to="'/lessons/create'" 
              class="dark:text-white text-main-dark hover:text-primary-dark dark:hover:text-primary-light"
              title="Créer un nouveau cours">
              <i class="fas fa-plus-circle"></i>
              <span class="ml-2">Créer Cours</span>
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
    </nav>
  </header>
</template>

<style scoped>
.separator {
  @apply h-6 w-px transition-colors duration-200 dark:bg-gray-600 bg-gray-300;
}
</style>