import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        accessToken: null,
        refreshToken: null,
        name: null,
        surname: null,
        email: null,
        role: null,
    }),

    actions: {
        async signIn(email, password) {
            console.log('Sign in with email:', email, 'and password:', password);
            this.accessToken = 'fake-access-token';
            this.role = 100;
        },
        async signUp(email, password) {
            console.log('Sign up with email:', email, 'and password:', password);
            this.accessToken = 'fake-access-token';
            this.role = 100;
        },
        signOut() {
            console.log('Sign out');
            this.accessToken = null;
            this.role = null;
        },
        hasAccess(action){
            if(action === 'admin'){
                return this.role === 100;
            }else if(action === 'enseignant'){
                return this.role === 10;
            }else if(action === 'etudiant'){
                return this.role === 1;
            }else{
                return false;
            }
        }
    },

    getters: {
        isLogged(state) {
            return state.accessToken !== null;
        },
        getFullName(state) {
            return state.name + ' ' + state.surname;
        },
        token(state){
            return state.accessToken
        },
    },

    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['accessToken', 'refreshToken'] }
        ]
    }
})