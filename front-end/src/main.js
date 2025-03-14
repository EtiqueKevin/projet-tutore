// CSS
import '@/assets/main.css'
import "vue-toastification/dist/index.css"

//plugins
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import api from '@/plugins/api'
import Toast from "vue-toastification"
import App from '@/App.vue'
import router from '@/router'

const url = import.meta.env.VITE_API_URL
const app = createApp(App)

app.provide('imageUrl', url + '/assets/img/')

//setup api
app.use(api, {
    baseURL: url,
})

//setup pinia
const pinia = createPinia()
pinia.use(piniaPersist)
pinia.use(({ store }) => {
    store.$api = app.config.globalProperties.$api,
    store.$imageUrl = url + '/assets/img/'
})

app.use(Toast, {
    position: "bottom-right"
})
app.use(pinia)
app.use(router)

app.mount('#app')