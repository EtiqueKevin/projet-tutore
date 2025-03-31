import { defineStore } from 'pinia'

export const useLessonStore = defineStore('jeanCademieLesson', {
    state: () => ({
        lessons: {},
        activeUserEmail: null
    }),

    actions: {
        setActiveUser(email) {
            this.activeUserEmail = email;
            if (!this.lessons[email]) {
                this.lessons[email] = {
                    id: null,
                    moduleId: null,
                    type: '',
                    title: '',
                    description: '',
                    content: [],
                }
            }
        },

        clearCurrentLesson() {
            if (!this.activeUserEmail) return;
            this.lessons[this.activeUserEmail] = {
                id: null,
                title: '',
                description: '',
                type: '',
                content: [],
                moduleId: null
            }
        },

        addContent(content) {
            if (!this.activeUserEmail) return;
            this.lessons[this.activeUserEmail].content.push(content);
        },
        
        updateContent(index, content) {
            if (!this.activeUserEmail) return;
            this.lessons[this.activeUserEmail].content[index] = content;
        },
        
        overWriteContent(content) {
            if (!this.activeUserEmail) return;
            this.lessons[this.activeUserEmail].content = content;
        },

        setLesson(lesson, id) {
            if (!this.activeUserEmail) return;
            this.lessons[this.activeUserEmail] = {
                id: lesson.id,
                title: lesson.name,
                description: lesson.description,
                type: lesson.type,
                content: lesson.content,
                moduleId: id
            }
        },

        setModuleId(id) {
            if (!this.activeUserEmail) return;
            this.lessons[this.activeUserEmail].moduleId = id;
        },

        async saveCurrentLesson() {
            if (!this.activeUserEmail) return false;
            const currentLesson = this.lessons[this.activeUserEmail];

            try {
                if (currentLesson.id === null) {
                    const res = await this.$api.post('modules/' + currentLesson.moduleId + '/lessons', {
                        name: currentLesson.title,
                        description: currentLesson.description,
                        type: currentLesson.type,
                        content: currentLesson.content,
                        userEmail: this.activeUserEmail
                    });
                } else {
                    const res = await this.$api.put('lessons/' + currentLesson.id, {
                        name: currentLesson.title,
                        description: currentLesson.description,
                        type: currentLesson.type,
                        content: currentLesson.content,
                        userEmail: this.activeUserEmail
                    });
                }
                this.clearCurrentLesson();
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    },

    getters: {
        getCurrentLesson(state) {
            return state.activeUserEmail ? state.lessons[state.activeUserEmail] : null;
        },
        isLessonEmpty(state) {
            if (!state.activeUserEmail) return true;
            const lesson = state.lessons[state.activeUserEmail];
            return lesson.title === '' && lesson.description === '' && lesson.content.length === 0;
        },
        isInit(state) {
            if (!state.activeUserEmail) return false;
            return state.lessons[state.activeUserEmail].moduleId !== null;
        },
        isValid(state) {
            if (!state.activeUserEmail) return false;
            const lesson = state.lessons[state.activeUserEmail];
            return lesson.title !== '' && lesson.description !== '' && lesson.content.length !== 0;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['lessons', 'activeUserEmail'] }
        ]
    }
})