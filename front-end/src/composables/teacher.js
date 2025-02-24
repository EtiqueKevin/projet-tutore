import { ref, inject } from 'vue'

export function useTeacher() {
    const api = inject('api')

    async function postModule(name, desc){
        try {
            const res = await api.post(`/modules/`,{
                name: name,
                nblesson: 0,
                description: desc,
                idCreator: "123e4567-e89b-12d3-a456-426614174000"
            })
            console.log(res);
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
                idCreator: "123e4567-e89b-12d3-a456-426614174000"
            })
            console.log(res);
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }  
    }

    async function deleteModule(id) {
        try{
            const res = await api.delete(`/modules/${id}`)
            console.log(res);
            return true;
        }catch(error){
            console.error(error);
            return false;
        }
    }

    return {
        postModule,
        deleteModule,
        putModule
    }
}