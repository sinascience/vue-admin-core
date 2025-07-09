import axios from 'axios'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

const apiService = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
})

// Request Interceptor
// This runs before every request is sent.
apiService.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response Interceptor (handles token refresh)
apiService.interceptors.response.use(
  (response) => response, // Directly return successful responses
  async (error) => {
    const originalRequest = error.config
    const authStore = useAuthStore()

    // Check if the error is 401 and it's not a retry request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Mark it as a retry

      try {
        await authStore.refresh() // Attempt to refresh the token

        // Update the header with the new token
        originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`

        // Retry the original request with the new token
        return apiService(originalRequest)
      } catch (refreshError) {
        // If refresh fails, the logout logic in the store will handle redirection
        return Promise.reject(refreshError)
      }
    }

    // For other errors, just pass them along
    return Promise.reject(error)
  },
)

export default apiService
