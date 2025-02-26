export default [
    {
        path: 'teacher/lesson/create',
        name: 'teacher-lesson-create',
        component: () => import('@/views/lesson/LessonCreateView.vue'),
        meta: { 
          requiresAuth: true,
          requiresTeacher: true
        }
    },
    {
      path: 'teacher/modules',
      name: 'teacher-modules',
      component: () => import('@/views/module/EditorModulesView.vue'),
      meta: { 
        requiresAuth: true,
        requiresTeacher: true
      }
    },
    {
      path: 'teacher/modules/:id',
      name: 'teacher-module-id',
      component: () => import('@/views/module/EditorModulesByIdView.vue'),
      meta: { 
        requiresAuth: true,
        requiresTeacher: true
      }
    }
]