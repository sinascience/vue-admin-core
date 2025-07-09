export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface RefreshTokenPayload {
  refresh_token: string
}

export interface Tokens {
  access_token: string
  refresh_token: string
}

export interface AuthResponse {
  status_code: number
  data: Tokens
}
