import { ref, inject } from 'vue'

export function useTeacher() {
    const api = inject('api')

    async function postModule(name, desc){
        try {
            const res = await api.post(`/modules/`,{
                name: name,
                nblesson: 0,
                description: desc,
            })
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }  
    }

    async function putModule(id, name, desc, nblesson){
        try {
            const res = await api.put(`/modules/${id}`,{
                name: name,
                description: desc,
                nblesson: nblesson,
            })
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }  
    }

    async function deleteModule(id) {
        try{
            const res = await api.delete(`/modules/${id}`)
            return true;
        }catch(error){
            console.error(error);
            return false;
        }
    }

    async function deleteLesson(moduleId, lessonId) {
        try{
            const res = await api.delete(`/modules/${moduleId}/lessons/${lessonId}`)
            return true;
        }catch(error){
            console.error(error);
            return false;
        }
    }

    async function getModuleUser(){
        try {
            const res = await api.get(`/users/modules`)
            return res.data.modules;
        } catch(error) {
            console.error(error);
            return false;
        }  
    }

    async function getErrorsByModule(moduleId){
        try{
            const resLessons = await api.get(`/modules/${moduleId}/lessons`)
            const lessons = resLessons.data.lessons    
        
            let promises = []
            lessons.forEach(lesson => {
                promises.push(api.get(`/lessons/${lesson.id}/erreurs`))
            })
            const resErrors = await Promise.all(promises)
            return resErrors.map((res, index) => {
                return {
                    lessonInfo: lessons[index],
                    errors: res.data.erreur
                }
            });
        }catch(error){
            console.error(error);
            return [];
        }
    }

    return {
        postModule,
        deleteModule,
        putModule,
        deleteLesson,
        getModuleUser,
        getErrorsByModule
    }
}