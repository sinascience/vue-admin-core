import apiService from '@/services/apiService'
import type { ApiResponse } from '@/pkg/response/response' // We need to define this type
import type { User } from '@/types'

class UserService {
  async getProfile(): Promise<ApiResponse> {
    const response = await apiService.get('/profile')
    return response.data
  }
}

export default new UserService()
