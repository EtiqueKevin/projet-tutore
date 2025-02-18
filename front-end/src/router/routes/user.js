export default [
    {
      path: 'user/profile',
      name: 'user-profile',
      component: () => import('@/views/user/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'feed',
      name: 'feed',
      component: () => import('@/views/user/FeedView.vue'),
      meta: { requiresAuth: true }
    },
]