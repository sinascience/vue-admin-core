import DashboardLayout from '@/layouts/DashboardLayout.vue'

export default [
  {
    path: '/posts',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'posts-list',
        component: () => import('./views/PostsListView.vue'),
      },
      // We will add routes for creating and editing posts here later
    ],
  },
]
