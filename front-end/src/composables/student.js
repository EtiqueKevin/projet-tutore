import { inject } from 'vue'
import { useUserStore } from '@/stores/user'

export function useStudent() {
    const api = inject('api')
    const userStore = useUserStore()

    async function loadModule(id) {
        try {
            let query = ''
            if(userStore.isLogged) {
                query += `?connecte=oui`
            }
            const res = await api.get(`/modules/${id}`)
            let currentModule = {
                id: res.data.module.id,
                name: res.data.module.name,
                description: res.data.module.description,
                creator: res.data.module.idCreator,
                lessonCount: res.data.module.nblesson,
                lastUpdate: res.data.module.dateupdate,
                note: res.data.module.note,
                lessons: []
            }
            
            const resLessons = await api.get(`/modules/${id}/lessons`+query)
            currentModule.lessons = resLessons.data.lessons
            return currentModule
        } catch(error) {
            console.log(error)
        }
    }

    async function loadCours(id) {
        try {
            let query = ''
            if(userStore.isLogged) {
                query += `?connecte=oui`
            }
            const res = await api.get(`/lessons/${id}`+query)
            const currentLesson = {
                id: res.data.lesson.id,
                title: res.data.lesson.name,
                description: res.data.lesson.description,
                content: res.data.lesson.content,
                status: res.data.lesson.status,
            }
            return currentLesson
        } catch(error) {
            console.log(error)
        }
    }

    async function startCours(id) {
        try {
            const res = await api.post(`/lessons/${id}/start_lesson`)
            return true;
        } catch(error) {
            console.log(error)
            return false;
        }
    }

    async function endCours(id) {
        try {
            const res = await api.post(`/lessons/${id}/finish_lesson`)
            return true;
        } catch(error) {
            console.log(error)
            return false;
        }
    }

    async function getModules() {
        try {
            let query = ''
            if(userStore.isLogged) {
                query += `?connecte=oui`
            }
            const res = await api.get('/modules'+query)
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
            if(userStore.isLogged) {
                query == '' ? query += `connecte=oui` : query += `&connecte=oui`
            }
            const res = await api.get(`/modules?${query}`)
            return res.data.modules
        } catch(error) {
            console.log(error)
        }
    }

    async function loadContent(idLesson, nbContent) {
        const lesson = await loadCours(idLesson)
        if(lesson.content[nbContent].type === 'text') {
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
        loadContent,
        searchModule,
        correctExercice,
        startCours,
        endCours
    }
}