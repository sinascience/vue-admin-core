import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/auth/router'
import postRoutes from '@/modules/posts/router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '', // Default child for /dashboard
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
      ],
    },
    ...authRoutes,
    ...postRoutes,
    {
      path: '/',
      redirect: '/auth/login',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/errors/NotFound.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const nonAuth = to.matched.some((record) => record.meta.nonAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    // If route requires auth and user is not authenticated, redirect to login
    next({ name: 'login' })
  } else if (requiresAuth && authStore.isAuthenticated && !authStore.user) {
    // If user is authenticated but profile is not loaded, fetch it
    await authStore.fetchProfile()
    next()
  } else if (nonAuth && authStore.isAuthenticated) {
    // If the user is already authenticated and tries to access a non-auth route (like login), redirect them to the dashboard
    next({ name: 'dashboard' })
  } else {
    // Otherwise, allow navigation
    next()
  }
})

export default router
