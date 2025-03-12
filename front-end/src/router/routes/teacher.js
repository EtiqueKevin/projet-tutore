import LessonCreateView from '@/views/lesson/LessonCreateView.vue'

export default [
    {
        path: 'teacher/lesson/create',
        name: 'teacher-lesson-create',
        component: LessonCreateView,
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
    },
    {
      path: 'teacher/statistics',
      name: 'teacher-statistics',
      component: () => import('@/views/teacher/TeacherStatisticsView.vue'),
    }
]