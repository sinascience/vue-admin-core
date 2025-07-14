import { defineStore } from 'pinia'
// import postService from '../services/post.service'
import type { Post } from '@/types'

interface PostsState {
  posts: Post[]
  post: Post | null
  totalRecords: number
  loading: boolean
  error: string | null
}

// MOCK DATA
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'First Post Title',
    body: '...',
    user_id: '1',
    created_at: '2025-07-10T12:00:00Z',
    updated_at: '',
    author: {
      id: '1',
      name: 'Brian Hughes',
      email: '',
      avatar_url: 'https://i.pravatar.cc/40?u=brian',
      image_status: '',
    },
    status: 'published',
  },
  {
    id: '2',
    title: 'Second Post Exploring Vue',
    body: '...',
    user_id: '2',
    created_at: '2025-07-09T11:00:00Z',
    updated_at: '',
    author: {
      id: '2',
      name: 'Anis Fajar',
      email: '',
      avatar_url: 'https://i.pravatar.cc/40?u=anis',
      image_status: '',
    },
    status: 'draft',
  },
  {
    id: '3',
    title: 'A Guide to Modern Frontend',
    body: '...',
    user_id: '1',
    created_at: '2025-07-08T10:00:00Z',
    updated_at: '',
    author: {
      id: '1',
      name: 'Brian Hughes',
      email: '',
      avatar_url: 'https://i.pravatar.cc/40?u=brian',
      image_status: '',
    },
    status: 'published',
  },
]

export const usePostStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    post: null,
    totalRecords: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPosts(page = 1, limit = 10) {
      this.loading = true
      this.error = null
      // try {
      //   const response = await postService.getPosts(page, limit)
      //   this.posts = response.data
      //   this.totalRecords = response.meta.total_records
      //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // } catch (error: any) {
      //   this.error = 'Failed to fetch posts.'
      //   console.error(error)
      // } finally {
      //   this.loading = false
      // }

      const start = (page - 1) * limit
      const end = start + limit
      this.posts = mockPosts.slice(start, end)
      this.totalRecords = mockPosts.length
      this.loading = false
    },
    // Add actions for create, update, delete as needed
  },
})
