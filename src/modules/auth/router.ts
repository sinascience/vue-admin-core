import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'

export default [
  {
    path: '/auth',
    component: AuthLayout,
    meta: { nonAuth: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView,
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView, // Add the register route
      },
    ],
  },
]
