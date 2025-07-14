import apiService from '@/services/apiService'
import type { ApiResponse } from '@/pkg/response/response'

// Define the payload for creating/updating a post
interface PostPayload {
  title: string
  body: string
}

class PostService {
  // Fetch all posts with pagination
  async getPosts(page = 1, limit = 10): Promise<ApiResponse> {
    const response = await apiService.get('/posts', {
      params: { page, limit },
    })
    return response.data
  }

  // Fetch a single post by ID
  async getPost(id: string): Promise<ApiResponse> {
    const response = await apiService.get(`/posts/${id}`)
    return response.data
  }

  // Create a new post
  async createPost(payload: PostPayload): Promise<ApiResponse> {
    const response = await apiService.post('/posts', payload)
    return response.data
  }

  // Update an existing post
  async updatePost(id: string, payload: PostPayload): Promise<ApiResponse> {
    const response = await apiService.put(`/posts/${id}`, payload)
    return response.data
  }

  // Delete a post
  async deletePost(id: string): Promise<void> {
    await apiService.delete(`/posts/${id}`)
  }
}

export default new PostService()
