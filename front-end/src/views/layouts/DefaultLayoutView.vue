<script setup>
import HeaderComposant from '@/components/structure/HeaderComposant.vue'
import FooterComposant from '@/components/structure/FooterComposant.vue'
</script>

<template>
    <HeaderComposant />
    <RouterView />
    <FooterComposant />
</template>