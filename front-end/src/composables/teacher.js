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
            return res.data;
        } catch(error) {
            console.error(error);
            return false;
        }  
    }

    return {
        postModule,
        deleteModule,
        putModule,
        deleteLesson,
        getModuleUser
    }
}