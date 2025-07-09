import apiService from '@/services/apiService'
import type { LoginCredentials, AuthResponse, RegisterPayload, RefreshTokenPayload } from '../types'

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post('/login', credentials)
    return response.data
  }

  async register(payload: RegisterPayload): Promise<void> {
    await apiService.post('/register', payload)
  }

  async refreshToken(payload: RefreshTokenPayload): Promise<AuthResponse> {
    const response = await apiService.post('/refresh', payload)
    return response.data
  }
}

export default new AuthService()
