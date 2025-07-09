import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/auth/router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout, // All child routes will use the dynamic dashboard layout
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: ':pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/views/errors/NotFound.vue'),
        },
        // Add other dashboard-area routes here in the future
        // { path: 'posts', name: 'posts', component: ... }
      ],
    },
    // Spread the auth routes into the main router array
    ...authRoutes,

    // Add a default route and dashboard route later
    {
      path: '/',
      redirect: '/auth/login',
    },
  ],
})

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    // If route requires auth and user is not authenticated, redirect to login
    next({ name: 'login' })
  } else if (requiresAuth && authStore.isAuthenticated && !authStore.user) {
    // If user is authenticated but profile is not loaded, fetch it
    await authStore.fetchProfile()
    next()
  } else {
    // Otherwise, allow navigation
    next()
  }
})

export default router
