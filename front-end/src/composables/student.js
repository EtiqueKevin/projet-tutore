import { ref, inject } from 'vue'

export function useStudent() {
    const api = inject('api')

    async function loadModule(id) {
        try {
            const res = await api.get(`/modules/${id}`)
            let currentModule = {
                id: res.data.module.id,
                name: res.data.module.name,
                description: res.data.module.description,
                creator: res.data.module.idCreator,
                lessonCount: res.data.module.nblesson,
                lastUpdate: new Date(parseInt(res.data.module.dateupdate)),
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
            const res = await api.get('/modules')
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

    return {
        loadModule,
        loadCours,
        getModules,
        loadExercice
    }
}