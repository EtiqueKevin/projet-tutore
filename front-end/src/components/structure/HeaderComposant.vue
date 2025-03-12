<script setup>
import { ref } from 'vue';
import RouterButton from '@/components/structure/buttons/RouterButton.vue';
import Button from '@/components/structure/buttons/Button.vue';
import ChangeThemeButton from '@/components/structure/buttons/ChangeThemeButton.vue';
import MenuList from './list/MenuList.vue';
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
  <header class="sticky top-0 z-50 backdrop-blur-sm shadow-lg dark:bg-background-dark/95 bg-background-light/95 h-12">
    <nav class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-12">
        <!-- Logo -->
        <router-link to="/" 
                     class="flex-shrink-0 flex items-center hover:opacity-80" 
                     title="Retour a l'accueil">
          <img class="h-8 w-auto" src="@/assets/logo.png" alt="Logo" />
          <span class="ml-2 text-xl font-bold dark:text-white text-main-dark">Jeancadémie</span>
        </router-link>

        <!-- Mobile menu button -->
        <button @click="toggleMobileMenu" 
                class="md:hidden inline-flex items-center justify-center p-2 rounded-md dark:text-white text-main-dark hover:text-primary-dark dark:hover:text-primary-light focus:outline-none">
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

          <MenuList v-if="userStore.isTeacher">
            <template #text>
              <p class="font-bold">Espace Professeur</p>
            </template>
            <RouterButton v-if="userStore.isTeacher"
                         :to="'/teacher/modules'" 
                         class="text-left dark:text-white text-main-dark hover:text-primary-dark dark:hover:text-primary-light"
                         title="Gérer mes modules">
              <i class="fas fa-book"></i>
              <span class="ml-2">Mes modules</span>
            </RouterButton>
            <RouterButton v-if="userStore.isTeacher"
                         :to="'/teacher/statistics'" 
                         class="text-left dark:text-white text-main-dark hover:text-primary-dark dark:hover:text-primary-light"
                         title="Gérer mes modules">
              <i class="fa-solid fa-chart-line"></i>
              <span class="ml-2">Mes Statistiques</span>
            </RouterButton>
          </MenuList>

          <div class="separator"></div>

          <ChangeThemeButton :show-text="false"/>

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
            <RouterButton :to="'/user/profile'" title="Mon profil" :other="'min-w-8 h-8'">
              <img :src="userStore.getImage" class="w-8 h-8 rounded-full" />
            </RouterButton>
            <Button @click="logOut()" title="Se déconnecter">
              <i class="fas fa-sign-out-alt"></i>
            </Button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div :class="[isMobileMenuOpen ? 'block' : 'hidden', 'md:hidden']"
           class="absolute top-12 left-0 right-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm shadow-lg border-t dark:border-gray-700 border-gray-200">
           <div class="flex flex-col h-full overflow-y-auto">
            <!-- User Profile Section (if logged in) -->
            <div v-if="userStore.isLogged" class="p-4 border-b dark:border-gray-700 border-gray-200">
              <div class="flex items-center space-x-3">
                <RouterButton :to="'/user/profile'" title="Mon profil" :other="'min-w-8 h-8 flex items-center gap-2'">
                <img :src="userStore.getImage" class="w-12 h-12 rounded-full" />
                <div>
                  <h3 class="font-bold dark:text-white text-main-dark">{{ userStore.getName }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ userStore.getEmail }}</p>
                </div>
              </RouterButton>
              </div>
            </div>

            <!-- Navigation Menu -->
            <nav class="flex-1 px-4 py-6 space-y-6">
              <!-- Main Navigation -->
              <div class="space-y-3">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Navigation</h3>
                <RouterButton :to="'/modules'" 
                            class="w-full justify-start py-2"
                            title="Voir les modules">
                  <i class="fas fa-th-large w-5"></i>
                  <span class="ml-3">Modules</span>
                </RouterButton>
              </div>

              <!-- Teacher Section -->
              <div v-if="userStore.isTeacher" class="space-y-3">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Espace Professeur</h3>
                <RouterButton :to="'/teacher/modules'" 
                            :other="'block text-left'"
                            title="Gérer mes modules">
                  <i class="fas fa-book w-5"></i>
                  <span class="ml-3">Mes modules</span>
                </RouterButton>
                <RouterButton :to="'/teacher/statistics'" 
                            :other="'block text-left'"
                            title="Mes statistiques">
                  <i class="fa-solid fa-chart-line w-5"></i>
                  <span class="ml-3">Mes Statistiques</span>
                </RouterButton>
              </div>

              <!-- Admin Section -->
              <div v-if="userStore.isAdmin" class="space-y-3">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Administration</h3>
                <RouterButton :to="'/admin'"
                            class="w-full justify-start py-2"
                            title="Accéder au Back Office">
                  <i class="fas fa-cog w-5"></i>
                  <span class="ml-3">Administration</span>
                </RouterButton>
              </div>

              <!-- Settings Section -->
              <div class="space-y-3">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Paramètres</h3>
                <div class="py-2">
                  <ChangeThemeButton :show-text="true" class="w-full justify-start" />
                </div>
              </div>
            </nav>

            <!-- Bottom Actions -->
            <div class="border-t dark:border-gray-700 border-gray-200 p-4">
              <template v-if="!userStore.isLogged">
                <RouterButton :to="'/user/connect'" 
                            class="w-full justify-center py-2 text-gray-500 dark:text-gray-400 rounded-lg"
                            title="Se connecter">
                  <i class="fas fa-power-off"></i>
                  <span class="ml-2">Se connecter</span>
                </RouterButton>
              </template>
              <template v-else>
                <Button @click="logOut()" 
                       class="justify-center py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 rounded-lg"
                       title="Se déconnecter">
                  <i class="fas fa-sign-out-alt"></i>
                  <span class="ml-2">Se déconnecter</span>
                </Button>
              </template>
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
