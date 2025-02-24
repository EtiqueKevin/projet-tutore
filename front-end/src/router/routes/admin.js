export default [
    {
      path: 'admin',
      name: 'admin',
      component: () => import('@/views/admin/BackOfficeView.vue'),
      children: [
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('@/views/admin/ManageUsersView.vue'),
          meta: { 
            requiresAuth: true,
            requiresAdmin: true
          }
        },
      ],
      meta: { 
        requiresAuth: true,
        requiresAdmin: true
      }
    },
  ]