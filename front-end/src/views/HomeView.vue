<script setup>
import studentImage from '@/assets/student.jpg';
import teacherImage from '@/assets/teacher.jpg';
import adminImage from '@/assets/admin.jpg';

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<template>
  <main class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <div class="relative flex flex-col items-center justify-center py-20">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Découvrez la Programmation avec Jeancadémie
        </h1>
        <p class="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Une plateforme d'apprentissage interactive pour maîtriser de nouveaux langages de programmation
        </p>
        <div class="flex justify-center gap-4">
          <router-link to="/modules" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
            Commencer à Apprendre
          </router-link>
          <router-link v-if="!userStore.isLogged" to="/user/connect" class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg">
            S'inscrire
          </router-link>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 py-16">
    <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Nos Fonctionnalités par Profil</h2>
    
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Student Features -->
      <div class="profil">
        <img :src="studentImage" alt="Student" class="w-full h-48 object-cover rounded-lg mb-4">
        <h3 class="text-xl font-bold mb-2 dark:text-white">Espace Étudiant</h3>
        <ul class="text-gray-600 dark:text-gray-300 space-y-2">
          <li>• Inscription et accès personnalisé</li>
          <li>• Parcours d'apprentissage interactif</li>
          <li>• Accès aux cours et exercices</li>
          <li>• Suivi de progression personnalisé</li>
        </ul>
      </div>

      <!-- Teacher Features -->
      <div class="profil">
        <img :src="teacherImage" alt="Teacher" class="w-full h-48 object-cover rounded-lg mb-4">
        <h3 class="text-xl font-bold mb-2 dark:text-white">Espace Enseignant</h3>
        <ul class="text-gray-600 dark:text-gray-300 space-y-2">
          <li>• Création de cours et exercices</li>
          <li>• Organisation de modules</li>
          <li>• Gestion des leçons</li>
          <li>• Suivi des étudiants</li>
        </ul>
      </div>

      <!-- Admin Features -->
      <div class="profil">
        <img :src="adminImage" alt="Admin" class="w-full h-48 object-cover rounded-lg mb-4">
        <h3 class="text-xl font-bold mb-2 dark:text-white">Espace Administrateur</h3>
        <ul class="text-gray-600 dark:text-gray-300 space-y-2">
          <li>• Gestion des utilisateurs</li>
          <li>• Modération des contenus</li>
          <li>• Administration de la plateforme</li>
          <li>• Supervision globale</li>
        </ul>
      </div>
    </div>
    </div>
  </main>
</template>

<style scoped>

.profil {
  @apply bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg;
}

.profil:hover {
  transform: scale(1.03);
}
</style>