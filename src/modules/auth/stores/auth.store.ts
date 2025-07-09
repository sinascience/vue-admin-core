import { defineStore } from 'pinia'
import authService from '../services/auth.service'
import type { LoginCredentials, RegisterPayload } from '../types'
import type { User } from '@/types'
import router from '@/router'
import userService from '@/services/userService'
import defaultAvatar from '@/assets/default-profile.png'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    // This new getter computes the correct avatar URL
    displayAvatarUrl(state): string {
      if (!state.user) {
        return defaultAvatar
      }

      switch (state.user.image_status) {
        case 'local':
        case 'cloud': // For now, both local and cloud point to the same public path
          // This constructs a URL to the image served from your '/public' folder
          return `/public/uploads/avatars/${state.user.avatar_url}`
        case 'uploading':
        default:
          // Return the imported default image
          return defaultAvatar
      }
    },
  },

  actions: {
    async login(credentials: LoginCredentials) {
      try {
        const response = await authService.login(credentials)
        this.accessToken = response.data.access_token
        this.refreshToken = response.data.refresh_token
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async register(payload: RegisterPayload) {
      try {
        await authService.register(payload)
        return Promise.resolve()
      } catch (error) {
        // The error object from Axios might contain more details
        return Promise.reject(error)
      }
    },

    async refresh() {
      if (!this.refreshToken) {
        return Promise.reject(new Error('No refresh token available.'))
      }

      try {
        const response = await authService.refreshToken({ refresh_token: this.refreshToken })
        this.accessToken = response.data.access_token
        this.refreshToken = response.data.refresh_token
        return Promise.resolve()
      } catch (error) {
        // If refresh fails, log the user out completely
        this.logout()
        return Promise.reject(error)
      }
    },

    logout() {
      this.$reset()
      router.push('/auth/login')
    },

    async fetchProfile() {
      if (this.user) return // Don't fetch if user data already exists
      try {
        const response = await userService.getProfile()
        this.user = response.data
      } catch (error) {
        // If fetching profile fails (e.g., token is valid but user deleted), logout
        console.error('Failed to fetch profile, logging out.', error)
        this.logout()
      }
    },
  },

  persist: true,
})
