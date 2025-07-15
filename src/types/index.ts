export interface User {
  id: string
  name: string
  email: string
  avatar_url: string | null
  image_status: string
}

export interface Post {
  id: string
  title: string
  body: string
  user_id: string
  created_at: string
  updated_at: string
  author: User
  status: 'published' | 'draft'
}

// Re-export navigation types for convenience
export * from './navigation'
