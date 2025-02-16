<script setup>
import { useRoute } from 'vue-router'
import { useStudentStore } from '@/stores/student';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import ModuleHeader from '@/components/metier/module/ModuleHeader.vue'
import ModuleLessons from '@/components/metier/module/ModuleLessons.vue'

const studentStore = useStudentStore()
const userStore = useUserStore()
const route = useRoute()
const isLoading = ref(true)

const loadModuleWithDelay = async () => {
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 5000))
        await studentStore.loadModule(route.params.id)
    } catch (error) {
        console.error('Failed to fetch module:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    loadModuleWithDelay()
})
</script>

<template>
    <main class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <ModuleHeader 
                :is-loading="isLoading"
                :module="studentStore.getCurrentModule"
            />
            <ModuleLessons 
                :is-loading="isLoading"
                :module="studentStore.getCurrentModule"
                :is-user-logged="userStore.isLogged"
            />
        </div>
    </main>
</template>