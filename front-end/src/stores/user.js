
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useUserStore = defineStore('jeanCademieUser', {
    state: () => ({
        accessToken: null,
        refreshToken: null,
        name: null,
        surname: null,
        pseudo: null,
        email: null,
        role: null,
        image: null,
        preferences: {
            themeDark: null,
        }
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
                
                await this.loadInfo();
                
                toast.success('Connexion réussie');

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

                await this.loadInfo();

                toast.success('Inscription réussie');

                return true;
            } catch (e) {
                toast.error('Erreur lors de l\'inscription');
                return false;
            }
        },

        async updateProfile(data) {
            try {
                const formData = new FormData();
                formData.append('name', data.name);
                formData.append('surname', data.surname);
                formData.append('pseudo', data.pseudo);
                if (data.image) {
                    formData.append('image', data.image);
                }
        
                const res = await this.$api.post('/users/profile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
        
                // met a jour en local
                this.name = data.name;
                this.surname = data.surname;
                this.pseudo = data.pseudo;
        
                toast.success('Profile updated successfully');
                return true;
            } catch (e) {
                toast.error('Error updating profile');
                return false;
            }
        },

        async loadInfo() {
            if(!this.accessToken) return;

            try {
                const res = await this.$api.get('/user');
                const user = res.data.user;

                this.name = user.name;
                this.surname = user.surname;
                this.pseudo = user.pseudo;
                this.role = user.role;
                this.image = this.$imageUrl + user.linkpic;
            }catch{
                this.signOut();
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

        setPreferences(preferences) {
            this.preferences = preferences;
        }
    },

    getters: {
        isLogged(state) {
            return state.accessToken !== null;
        },

        isInit(state) {
            return state.role !== null;
        },

        token(state){
            return state.accessToken
        },
        getRefreshToken(state){
            return state.refreshToken
        },
        isTeacher(state){
            return state.role === 10 || state.role === 100;
        },
        isAdmin(state){
            return state.role === 100;
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
        getPreferences(state){
            return state.preferences;
        },
        getImage(state){
            return state.image;
        }
    },

    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['accessToken', 'refreshToken', 'preferences'] }
        ]
    }
})