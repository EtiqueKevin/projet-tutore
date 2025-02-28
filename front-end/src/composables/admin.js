import { ref, inject } from 'vue'

export function useAdmin() {
    const api = inject('api')

    async function getUsers() {
        try{
            const res = await api.get(`/users/`)
            return res.data.users;
        }catch(error){
            console.error(error);
            return null;
        }
    }

    async function deleteUser(id) {
        try{
            const res = await api.delete(`/users/${id}`)
            return res.data;
        }catch (error){
            console.error(error);
            return null;
        }
    }

    async function getDemandes() {
        try{
            const res = await api.get(`/demandes/`)
            return res.data.data;
        }catch(error){
            console.error(error);
            return null;
        }
    }

    return {
        getUsers,
        deleteUser,
        getDemandes,
    }
}