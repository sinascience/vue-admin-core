import { defineStore } from 'pinia'
import postService from '../services/post.service'
import type { Post } from '@/types'

interface PostsState {
  posts: Post[]
  post: Post | null
  totalRecords: number
  loading: boolean
  error: string | null
}

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
      try {
        const response = await postService.getPosts(page, limit)
        this.posts = response.data
        this.totalRecords = response.meta.total_records
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        this.error = 'Failed to fetch posts.'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    // Add actions for create, update, delete as needed
  },
})
