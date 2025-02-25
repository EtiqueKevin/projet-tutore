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
        //await new Promise(resolve => setTimeout(resolve, 1000))
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
    <main class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto" >
            <ModuleHeader 
                :is-loading="isLoading"
                :module="currentModule"
            />
            <ModuleLessons 
                :is-loading="isLoading"
                :module="currentModule"
                :is-user-logged="userStore.isLogged"
                :is-teacher="userStore.isTeacher"
            />
        </div>

        <ReturnTopButton />
    </main>
</template>