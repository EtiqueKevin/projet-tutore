import { inject } from 'vue'
import { useUserStore } from '@/stores/user'

export function useStudent() {
    const api = inject('api')
    const userStore = useUserStore()

    async function loadModule(id) {
        try {
            const res = await api.get(`/modules/${id}`)
            let currentModule = {
                id: res.data.module.id,
                name: res.data.module.name,
                description: res.data.module.description,
                creator: res.data.module.idCreator,
                lessonCount: res.data.module.nblesson,
                lastUpdate: res.data.module.dateupdate,
                lessons: []
            }
            
            const resLessons = await api.get(`/modules/${id}/lessons`)
            currentModule.lessons = resLessons.data.lessons
            return currentModule
        } catch(error) {
            console.log(error)
        }
    }

    async function loadCours(id) {
        try {
            const res = await api.get(`/lessons/${id}`)
            const currentLesson = {
                id: res.data.lesson.id,
                title: res.data.lesson.name,
                description: res.data.lesson.description,
                content: res.data.lesson.content
            }
            return currentLesson
        } catch(error) {
            console.log(error)
        }
    }

    async function getModules() {
        try {
            let query = ''
            const res = await api.get('/modules')
            console.log(res.data.modules)
            return res.data.modules
        } catch(error) {
            console.log(error)
        }
    }

    async function searchModule(name, description) {
        try {
            let query = ''
            if(name) {
                query += `name=${name}`
            }
            if(description) {
                query == '' ? query += `description=${description}` : query += `&description=${description}`
            }
            const res = await api.get(`/modules?${query}`)
            return res.data.modules
        } catch(error) {
            console.log(error)
        }
    }

    async function loadExercice(idLesson, nbContent) {
        const lesson = await loadCours(idLesson)
        if(lesson.content[nbContent].type !== 'code') {
            return null
        }
        return lesson.content[nbContent]
    }

    async function correctExercice(idLesson, nbContent, files, language) {
        try{
            const res = await api.post('/'+language, {
                id_lesson: idLesson,
                index: nbContent,
                codes: files
            })
            console.log(res)
            return res.data;
        }catch(error) {
            console.log(error)
        }
    }

    return {
        loadModule,
        loadCours,
        getModules,
        loadExercice,
        searchModule,
        correctExercice
    }
}