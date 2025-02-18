import { defineStore } from 'pinia'

export const useStudentStore = defineStore('student', {
    state: () => ({
        idLesson: null,
        idExercice: null,

        currentModule: {
            id: 0,
            name: "",
            description: "",
            creator: "",
            lessonCount: 0,
            lastUpdate: new Date(),
            lessons: []
        },
        currentLesson: {
            title: "",
            description: "",
            content: []
        },
        currentExercice: {
            statement: "",
            files: []
        },
    }),

    actions: {
        setCurrentExercice(exercice) {
            this.currentExercice = exercice
        },
        async loadModule(id) {
            try{
                const res = await this.$api.get(`/modules/${id}`);
                this.currentModule = {
                    id: res.data.module.id,
                    name: res.data.module.name,
                    description: res.data.module.description,
                    creator: res.data.module.idCreator,
                    lessonCount: res.data.module.nblesson,
                    lastUpdate: new Date(parseInt(res.data.module.dateupdate)),
                    lessons: []
                };
                
                const resLessons = await this.$api.get(`/modules/${id}/lessons`);
                this.currentModule.lessons = resLessons.data.lessons;
            }catch(error){
                console.log(error);
            }
        },
        async loadCours(id) {
            try{
                const res = await this.$api.get(`/lessons/${id}`);
                this.currentLesson = {
                    id : res.data.lesson.id,
                    title : res.data.lesson.name,
                    description : res.data.lesson.description,
                    content : res.data.lesson.content
                }
            }catch(error){
                console.log(error);
            }
        },
        async getModules(){
            try{
                const res = await this.$api.get('/modules');
                return res.data.modules;
            }catch(error){
                console.log(error);
            }
        }
    },

    getters: {
        currentCours(state) {
            return state.currentLesson;
        },

        isExerciceLoaded(state) {
            return state.currentExercice.statement !== "";
        },

        getCurrentModule(state) {
            return state.currentModule;
        }
    },
    
    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['idModule', 'idLesson', 'idExercice'] }
        ]
    }
})