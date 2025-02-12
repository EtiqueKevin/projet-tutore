import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  install: (app, options) => {
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
      if (error.response.status === 401) { // Unauthorized
        const userStore = useUserStore();
        const router = useRouter();
        const toast = useToast();

        if(!userStore.getRefreshToken) {
          userStore.logout();
          toast.error("Votre session a expiré. Veuillez vous reconnecter.");
          router.push('/');
          return Promise.reject(error);
        }
        
        try { // on tente de rafraîchir le token
          const res = await api.post('/refresh', {}, {
            headers: {
              Authorization: `Bearer ${userStore.getRefreshToken}`
            }
          });
          
          console.log(res.data);

          // si le rafraîchissement a réussi, on met à jour les tokens et on relance la requête
          userStore.setTokens(res.data.accessToken, res.data.refreshToken);
          error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return api(error.config);
        
        } catch(e) {
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
  }
}