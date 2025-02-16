export default [
    {
      path: 'user/profile',
      name: 'user-profile',
      component: () => import('@/views/user/ProfileView.vue'),
      meta: { requiresAuth: true }
    }
]