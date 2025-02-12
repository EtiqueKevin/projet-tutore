import { defineStore } from 'pinia'

export const useTeacherStore = defineStore('teacher', {
    state: () => ({
        currentLesson: {
            title: '',
            description: '',
            content: [],
        }
    }),

    actions: {
        clearCurrentLesson() {
            this.currentLesson = {
                title: '',
                description: '',
                content: [],
            }
        },

        addContent(content) {
            this.currentLesson.content.push(content);
        },
        
        updateContent(index, content) {
            this.currentLesson.content[index] = content;
        },
        
        overWriteContent(content) {
            this.currentLesson.content = content;
        }
    },

    getters: {
        getCurrentLesson(state){
            return state.currentLesson;
        },
        isLessonEmpty(state){
            return state.currentLesson.title === '' && state.currentLesson.description === '' && state.currentLesson.content.length === 0;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['currentLesson'] }
        ]
    }
})