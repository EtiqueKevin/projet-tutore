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
          meta: { requiresAuth: true }
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
          meta: { requiresAuth: true }
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
        },
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if(to.meta.requiresAuth && !userStore.isLogged) {
    next({ name: 'user-connect' })
  } else {
    next()
  }
});

export default router