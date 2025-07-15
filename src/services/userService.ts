import apiService from '@/services/apiService'
import type { ApiResponse } from '@/pkg/response/response'

class UserService {
  async getProfile(): Promise<ApiResponse> {
    const response = await apiService.get('/profile')
    return response.data
  }
}

export default new UserService()
