<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="dark:bg-background-dark bg-background-light backdrop-blur-sm dark:text-white text-main-dark h-12">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center text-sm py-3">
        <div class="flex items-center space-x-4">
          <span>{{ currentYear }} Jeancadémie</span>
        </div>
        
        <div class="flex space-x-4">
          <a href="https://grav.paul-bruson.fr/" 
             title="CMS du projet" 
             class="dark:hover:text-primary-light hover:text-primary-dark transition-colors duration-200">
            <i class="fab fa-grav text-xl"></i>
          </a>
          <a href="https://github.com/EtiqueKevin/projet-tutore" 
             title="Répository du projet" 
             class="dark:hover:text-primary-light hover:text-primary-dark transition-colors duration-200">
            <i class="fab fa-github text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>