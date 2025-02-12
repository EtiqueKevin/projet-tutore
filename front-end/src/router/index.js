import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import DefaultLayout from '@/views/layouts/DefaultLayoutView.vue'
import BlankLayout from '@/views/layouts/BlankLayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'exercice',
          name: 'exercice',
          component: () => import('@/views/exercices/ExerciceView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'exercise/create',
          name: 'exercise-create',
          component: () => import('@/views/exercices/ExerciceCreateView.vue'),
          meta: { 
            requiresAuth: true,
            requiresTeacher: true
          }
        },
        {
          path: 'cours',
          name: 'cours',
          component: () => import('@/views/cours/CoursView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'cours/create',
          name: 'cours-create',
          component: () => import('@/views/cours/CoursCreateView.vue'),
          meta: { 
            requiresAuth: true,
            requiresTeacher: true
          }
        },
        {
          path: 'user/profile',
          name: 'user-profile',
          component: () => import('@/views/user/ProfileView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      component: BlankLayout,
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

  if(!to.meta.requiresAuth && userStore.isLogged) {
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