import { createRouter, createWebHistory } from 'vue-router'
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
        },
        {
          path: 'cours/create',
          name: 'cours-create',
          component: () => import('@/views/cours/CoursCreateView.vue'),
        },
        {
          path: 'exercise/create',
          name: 'exercise-create',
          component: () => import('@/views/exercices/ExerciceCreateView.vue'),
        },
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

export default router