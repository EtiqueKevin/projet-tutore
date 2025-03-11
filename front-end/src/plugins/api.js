import axios from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { useToast } from 'vue-toastification'

export default {
  install: (app, options) => {
    let isLoading = false;
    const api = axios.create({
      baseURL: options.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // intercepte la requête pour ajouter le token d'authentification si l'utilisateur est connecté
    api.interceptors.request.use((config) => {
      const userStore = useUserStore();
      const token = userStore.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    })

    // intercepte la réponse pour gérer les erreurs d'authentification
    api.interceptors.response.use((response) => {
      return response
    }, async (error) => {
      if (error.response.status === 401 && !isLoading) { // Unauthorized
        const userStore = useUserStore();
        const toast = useToast();

        if(userStore.getRefreshToken === null) {
          userStore.logout();
          toast.error("Votre session a expiré. Veuillez vous reconnecter.");
          router.push('/');
          return Promise.reject(error);
        }
        
        try { // on tente de rafraîchir le token
          isLoading = true;
          const res = await api.post('/refresh', {}, {
            headers: {
              Authorization: `Bearer ${userStore.getRefreshToken}`
            }
          });
          isLoading = false;
          // si le rafraîchissement a réussi, on met à jour les tokens et on relance la requête
          userStore.setTokens(res.data.accessToken, res.data.refreshToken);
          error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return api(error.config);
        
        } catch(e) {
          isLoading=false;
          // si le rafraîchissement a échoué, on déconnecte l'utilisateur
          userStore.logout();
          toast.error("Votre session a expiré. Veuillez vous reconnecter.");
          router.push('/');
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    });

    app.config.globalProperties.$api = api
    app.provide('api', api)
  }
}