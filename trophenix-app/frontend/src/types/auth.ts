export type AuthTokens = {
  access: string
  refresh: string
}

export type User = {
  id: string
  email: string
  is_superuser: boolean
  athlete: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}
