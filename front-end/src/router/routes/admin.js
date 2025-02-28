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
        {
          path: 'modules',
          name: 'admin-module',
          component: () => import('@/views/admin/ManageModulesView.vue'),
          meta: { 
            requiresAuth: true,
            requiresAdmin: true
          }
        },
        {
          path: 'modules/:id',
          name: 'admin-module-details',
          component: () => import('@/views/module/EditorModulesByIdView.vue'),
          meta: { 
            requiresAuth: true,
            requiresAdmin: true
          }
        },
        {
          path: 'demandes',
          name: 'admin-demandes',
          component: () => import('@/views/admin/ManageDemandesView.vue'),
          meta: { 
            requiresAuth: true,
            requiresAdmin: true
          }
        }
      ],
      meta: { 
        requiresAuth: true,
        requiresAdmin: true
      }
    },
  ]