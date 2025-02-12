import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useUserStore = defineStore('user', {
    state: () => ({
        accessToken: null,
        refreshToken: null,
        name: null,
        surname: null,
        pseudo: null,
        email: null,
        role: null,
    }),

    actions: {
        async signIn(email, password) {
            try {
                const credentials = btoa(`${email}:${password}`);
                const res = await this.$api.post('signin', {}, {
                    headers: {
                        'Authorization': `Basic ${credentials}`
                    }
                });
                this.accessToken = res.data.atoken;
                this.refreshToken = res.data.rtoken;
                this.role = res.data.role;

                this.email = email;
                this.name = "Martin";
                this.surname = "Marie";
                this.pseudo = "kevin";

                return true;
            } catch (e) {
                toast.error('Erreur lors de la connexion');
                return false;
            }
        },
        
        async signUp(data) {
            try {
                const res = await this.$api.post('register', data);
                this.accessToken = res.data.atoken;
                this.refreshToken = res.data.rtoken;
                this.role = res.data.role;

                this.email = data.email;
                this.name = data.name;
                this.surname = data.surname;
                this.pseudo = data.pseudo;
                return true;
            } catch (e) {
                toast.error('Erreur lors de l\'inscription');
                return false;
            }
        },

        signOut() {
            this.accessToken = null;
            this.refreshToken = null;
            this.role = null;
            this.email = null;
            this.name = null;
            this.surname = null;
            this.pseudo = null;
        },
        
        setTokens(accessToken, refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        },
    },

    getters: {
        isLogged(state) {
            return state.accessToken !== null;
        },
        token(state){
            return state.accessToken
        },
        getRefreshToken(state){
            return state.refreshToken
        },
        isTeacher(state){
            return true;
            //return state.role === 1 || state.role === 2;
        },
        isAdmin(state){
            return true;
            //return state.role === 2;
        },
        getName(state){
            return state.name;
        },
        getSurname(state){
            return state.surname;
        },
        getEmail(state){
            return state.email;
        },

    },

    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['accessToken', 'refreshToken', 'role', 'name', 'surname', 'email', 'pseudo'] }
        ]
    }
})