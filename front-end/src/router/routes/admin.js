export default [
    {
      path: 'admin',
      name: 'admin',
      component: () => import('@/views/admin/BackOfficeView.vue'),
      meta: { 
        requiresAuth: true,
        requiresAdmin: true
      }
    },
  ]