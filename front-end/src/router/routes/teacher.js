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
      component: () => import('@/views/module/TeacherModulesView.vue'),
      meta: { 
        requiresAuth: true,
        requiresTeacher: true
      }
    },
    {
      path: 'teacher/modules/:id',
      name: 'teacher-module-id',
      component: () => import('@/views/module/TeacherModulesByIdView.vue'),
      meta: { 
        requiresAuth: true,
        requiresTeacher: true
      }
    }
]