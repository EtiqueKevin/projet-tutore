
<script setup>
const inProgressModules = [
  { id: 1, title: 'Introduction à Python', progress: 75 },
  { id: 2, title: 'JavaScript Avancé', progress: 30 },
  { id: 3, title: 'Bases de données SQL', progress: 45 },
];

const recentlyViewed = [
  { 
    id: 1, 
    type: 'Module',
    title: 'Les bases du HTML', 
    description: 'Structure et éléments fondamentaux',
    lastViewed: '18/02/2025'
  },
  { 
    id: 2, 
    type: 'Leçon',
    title: 'Boucles en Python', 
    description: 'For, While et leurs utilisations',
    lastViewed: '17/02/2025'
  },
  { 
    id: 3, 
    type: 'Module',
    title: 'CSS Flexbox', 
    description: 'Mise en page moderne avec Flexbox',
    lastViewed: '16/02/2025'
  },
];

const recommendations = [
  {
    id: 1,
    title: 'React pour débutants',
    description: 'Apprenez les fondamentaux de React',
    difficulty: 2
  },
  {
    id: 2,
    title: 'API REST avec Node.js',
    description: 'Créez votre première API REST',
    difficulty: 3
  },
  {
    id: 3,
    title: 'Git et GitHub',
    description: 'Maîtrisez le contrôle de version',
    difficulty: 1
  },
];
</script>

<template>
    <main class="container mx-auto px-4 py-8 min-h-screen">
      <!-- Zone 1: Modules en cours -->
      <section class="mb-10">
        <h2 class="text-2xl font-bold mb-4">Continuer mon apprentissage</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="module in inProgressModules" :key="module.id" 
               class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 class="font-semibold text-lg">{{ module.title }}</h3>
            <div class="mt-2 bg-gray-200 h-2 rounded-full">
              <div class="bg-blue-500 h-2 rounded-full" :style="{ width: module.progress + '%' }"></div>
            </div>
            <p class="text-sm text-gray-600 mt-2">Progression : {{ module.progress }}%</p>
            <button class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Continuer
            </button>
          </div>
        </div>
      </section>
  
      <!-- Zone 2: Récemment consultés -->
      <section class="mb-10">
        <h2 class="text-2xl font-bold mb-4">Récemment consultés</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="item in recentlyViewed" :key="item.id" 
               class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <span class="text-sm text-gray-500">{{ item.type }}</span>
            <h3 class="font-semibold text-lg">{{ item.title }}</h3>
            <p class="text-sm text-gray-600 mt-2">{{ item.description }}</p>
            <p class="text-xs text-gray-400 mt-2">Consulté le {{ item.lastViewed }}</p>
          </div>
        </div>
      </section>
    </main>
  </template>
