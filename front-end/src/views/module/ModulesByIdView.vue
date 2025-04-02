<script setup>
import { useRoute } from 'vue-router'
import { useStudent } from '@/composables/student'
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import ModuleHeader from '@/components/metier/module/ModuleHeader.vue'
import ModuleLessons from '@/components/metier/module/ModuleLessons.vue'
import ReturnTopButton from '@/components/structure/buttons/ReturnTopButton.vue';

const { loadModule } = useStudent()
const userStore = useUserStore()
const route = useRoute()
const isLoading = ref(true)
const currentModule = ref({})

const loadModuleWithDelay = async () => {
    try {
        currentModule.value = await loadModule(route.params.id)
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
    <main class="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
        <div class="max-w-7xl mx-auto mt-6" >
            <ModuleHeader 
                :is-loading="isLoading"
                :module="currentModule"
                :is-user-logged="userStore.isLogged"
                @refresh="loadModuleWithDelay"
            />
            <ModuleLessons 
                :is-loading="isLoading"
                :module="currentModule"
                :is-user-logged="userStore.isLogged"
            />
        </div>

        <ReturnTopButton />
        <RouterLink
          :to="{name: 'modules'}"
          class="text-primary-dark dark:text-primary-light flex items-center gap-2 m-2 hover:scale-105 transition-transform absolute top-5 left-5"
          title="Retour à la liste des modules"
        >
          <i class="fas fa-arrow-left"></i> Retour à la liste des modules
        </RouterLink>
    </main>
</template>