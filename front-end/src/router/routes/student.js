export default [
    {
      path: 'modules',
      name: 'modules',
      component: () => import('@/views/module/ModulesView.vue'),
    },
    {
      path: 'modules/:id',
      name: 'modules-by-id',
      component: () => import('@/views/module/ModulesByIdView.vue'),
    },
    {
        path: 'lessons/:id',
        name: 'lesson-by-id',
        component: () => import('@/views/lesson/LessonByIdView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: 'lessons/:id/content/:nbContent',
        name: 'exercice',
        component: () => import('@/views/exercices/ExerciceView.vue'),
        meta: { requiresAuth: true }
    },
  ]