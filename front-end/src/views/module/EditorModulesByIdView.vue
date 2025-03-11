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

const loadModules= async () => {
    isLoading.value = true
    try {
        currentModule.value = await loadModule(route.params.id)
    } catch (error) {
        console.error('Failed to fetch module:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    loadModules()
})
</script>

<template>
    <main class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto" >
            <ModuleHeader 
                :is-loading="isLoading"
                :module="currentModule"
                :is-user-logged="false"
            />
            <ModuleLessons 
                :is-loading="isLoading"
                :module="currentModule"
                :is-user-logged="userStore.isLogged"
                :is-teacher="userStore.isTeacher"
                @refresh="loadModules"
            />
        </div>

        <ReturnTopButton />
    </main>
</template>