import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/exercice',
      name: 'exercice',
      component: () => import('@/views/ExerciceView.vue'),
    },
    {
      path: '/cours/create',
      name: 'cours-create',
      component: () => import('@/views/CoursCreateView.vue'),
    }
  ],
})

export default router
