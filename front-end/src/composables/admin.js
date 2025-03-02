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

    async function deleteDemande(id) {
        try{
            const res = await api.delete(`/demandes/${id}`)
            return true;
        }catch (error){
            console.error(error);
            return false;
        }
    }

    async function validateDemande(id) {
        try{
            const res = await api.post(`/demandes/${id}/validate`)
            return true;
        }catch (error){
            console.error(error);
            return false;
        }
    }

    return {
        getUsers,
        deleteUser,
        getDemandes,
        deleteDemande,
        validateDemande
    }
}