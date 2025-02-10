import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        accessToken: null,
        refreshToken: null,
        name: null,
        surname: null,
        email: null,
    }),

    actions: {
        signIn(email, password) {
            console.log('Sign in with email:', email, 'and password:', password);
        },
        signUp(email, password) {
            console.log('Sign up with email:', email, 'and password:', password);
        },
        signOut() {
            console.log('Sign out');
        },
    },

    getters: {
        isAuthenticated(state) {
            return state.accessToken !== null;
        },
        getFullName(state) {
            return state.name + ' ' + state.surname;
        },
        token(state){
            return state.accessToken
        }
    }
})