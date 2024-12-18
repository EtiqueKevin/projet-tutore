<script setup>
import { RouterView } from 'vue-router'
import HeaderComposant from './components/structure/HeaderComposant.vue'
import FooterComposant from './components/structure/FooterComposant.vue'
</script>

<template>
  <HeaderComposant />
  <RouterView />
  <FooterComposant />
</template>

<style scoped>
</style>
