import { useCallback, useEffect, useState } from 'react'
import * as api from './api-calls'
import axiosInstance from '../axios'
import type { User } from '../../types'

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    setLoading(true)
    try {
      // For development: mock an athlete user if no backend
      if (process.env.NODE_ENV === 'development' && !localStorage.getItem('accessToken')) {
        const mockUser: User = {
          id: 'mock-athlete-123',
          email: 'athlete@example.com',
          is_superuser: false,
          athlete: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        }
        setUser(mockUser)
      } else {
        const me = await api.me()
        setUser(me as User | null)
      }
    } catch (err) {
      // If API fails, still set mock user in development
      if (process.env.NODE_ENV === 'development') {
        const mockUser: User = {
          id: 'mock-athlete-123',
          email: 'athlete@example.com',
          is_superuser: false,
          athlete: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        }
        setUser(mockUser)
      } else {
        setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  return { user, setUser, loading, reload: loadUser }
}

export async function loginAndStore(email: string, password: string) {
  const tokens = await api.login({ email, password })
  if (tokens?.access) {
    localStorage.setItem('accessToken', tokens.access)
  }
  if ((tokens as any)?.refresh) {
    localStorage.setItem('refreshToken', (tokens as any).refresh)
  }
  // set axios header immediately
  const access = tokens?.access || (tokens as any)?.accessToken
  if (access) axiosInstance.defaults.headers['Authorization'] = `JWT ${access}`
  return tokens
}

export function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  delete axiosInstance.defaults.headers['Authorization']
}
