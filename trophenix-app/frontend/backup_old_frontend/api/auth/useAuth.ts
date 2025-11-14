import { useCallback, useEffect, useState } from 'react'
import * as api from './api-calls'
import axiosInstance from '../axios'
import type { User } from '@/trophenix/types'

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    setLoading(true)
    try {
      const me = await api.me()
      setUser(me as User | null)
    } catch (err) {
      setUser(null)
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
