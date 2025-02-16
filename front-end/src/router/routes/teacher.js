export default [
    {
        path: 'exercise/create',
        name: 'exercise-create',
        component: () => import('@/views/exercices/ExerciceCreateView.vue'),
        meta: { 
          requiresAuth: true,
          requiresTeacher: true
        }
    },
    {
        path: 'lessons/create',
        name: 'lesson-create',
        component: () => import('@/views/lesson/LessonCreateView.vue'),
        meta: { 
          requiresAuth: true,
          requiresTeacher: true
        }
    },
]