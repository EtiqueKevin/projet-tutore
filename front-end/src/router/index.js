import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import DefaultLayout from '@/views/layouts/DefaultLayoutView.vue'
import BlankLayout from '@/views/layouts/BlankLayoutView.vue'

import StudentRoutes from './routes/student'
import TeacherRoutes from './routes/teacher'
import AdminRoutes from './routes/admin'
import UserRoutes from './routes/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      redirect: to => {
        const userStore = useUserStore()
        return userStore.isLogged ? '/feed' : '/accueil'
      },
      children: [
        {
          path: 'accueil',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        ...StudentRoutes,
        ...TeacherRoutes,
        ...AdminRoutes,
        ...UserRoutes
      ]
    },
    {
      path: '/',
      component: BlankLayout,
      redirect: to => {
        const userStore = useUserStore()
        return userStore.isLogged ? '/feed' : '/accueil'
      },
      children: [
        {
          path: 'user/connect',
          name: 'user-connect',
          component: () => import('@/views/user/ConnexionView.vue'),
          meta: { requiresAuth: false }
        },
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  // Redirection vers la page d'accueil si la route n'existe pas
  if(to.matched && to.matched.length === 0) {
    next({ name: 'home' })
    return
  }


  // Vérification des droits d'accès

  const userStore = useUserStore()
  if(to.meta.requiresAuth && !userStore.isLogged) {
    next({ name: 'user-connect' })
    return
  } 

  if(to.name === 'user-connect' && userStore.isLogged) {
    next({ name: 'home' })
    return
  }

  if(to.meta.requiresTeacher && !userStore.isTeacher){
    next({ name: 'home' })
    return
  }

  if(to.meta.requiresAdmin && !userStore.isAdmin){
    next({ name: 'home' })
    return
  }

  next()
});

export default router