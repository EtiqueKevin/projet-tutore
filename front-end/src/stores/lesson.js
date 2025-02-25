import { defineStore } from 'pinia'

export const useLessonStore = defineStore('jeanCademieLesson', {
    state: () => ({
        currentLesson: {
            id: null,
            moduleId: null,
            type: '',
            title: '',
            description: '',
            content: [],
        }
    }),

    actions: {
        clearCurrentLesson() {
            this.currentLesson = {
                id: null,
                title: '',
                description: '',
                type: '',
                content: [],
                moduleId: null
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
        },

        setLesson(lesson, id){
            this.currentLesson = {
                id: lesson.id,
                title: lesson.name,
                description: lesson.description,
                type: lesson.type,
                content: lesson.content,
                moduleId: id
            }
        },

        setModuleId(id){
            this.currentLesson.moduleId = id;
        },

        async saveCurrentLesson(){
            try{
                if(this.currentLesson.id === null){
                    const res = await this.$api.post('modules/'+this.currentLesson.moduleId+'/lessons', {
                        name: this.currentLesson.title,
                        description: this.currentLesson.description,
                        type: this.currentLesson.type,
                        content: this.currentLesson.content
                    });
                }else{
                    const res = await this.$api.put('lessons/'+this.currentLesson.id, {
                        name: this.currentLesson.title,
                        description: this.currentLesson.description,
                        type: this.currentLesson.type,
                        content: this.currentLesson.content
                    });
                }
                this.clearCurrentLesson();
                return true;
            }catch(e){
                console.log(e);
                return false;
            }
        }
    },

    getters: {
        getCurrentLesson(state){
            return state.currentLesson;
        },
        isLessonEmpty(state){
            return state.currentLesson.title === '' && state.currentLesson.description === '' && state.currentLesson.content.length === 0;
        },
        isInit(state){
            return state.currentLesson.moduleId !== null
        },
        isValid(state){
            return state.currentLesson.title !== '' && state.currentLesson.description !== '' && state.currentLesson.content.length !== 0;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['currentLesson'] }
        ]
    }
})