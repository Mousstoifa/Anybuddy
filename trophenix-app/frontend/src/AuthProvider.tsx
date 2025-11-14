import React, { createContext, useContext, useMemo } from 'react'
import { useAuthState, loginAndStore, logout as doLogout } from './api/auth/useAuth'
import type { User } from './types'

type AuthContextValue = {
  user: User | null
  loading: boolean
  reload: () => Promise<void>
  login: (email: string, password: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, userData?: any) => Promise<any>
  logout: () => void
  // legacy alias for older callers
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, loading, reload } = useAuthState() as any

  const value = useMemo(() => ({
    user,
    loading,
    reload,
    login: async (email: string, password: string) => {
      const tokens = await loginAndStore(email, password)
      try {
        // fetch user
        const me = await (await import('./api/auth/api-calls')).me()
        setUser(me)
      } catch (err) {
        // ignore
      }
      return tokens
    },
    signIn: async (email: string, password: string) => {
      const tokens = await loginAndStore(email, password)
      try {
        // fetch user
        const me = await (await import('./api/auth/api-calls')).me()
        setUser(me)
      } catch (err) {
        // ignore
      }
      return tokens
    },
    signUp: async (email: string, password: string, userData?: any) => {
      const { register } = await import('./api/auth/api-calls')
      const payload = { 
        email, 
        password, 
        first_name: userData?.first_name,
        last_name: userData?.last_name 
      }
      return await register(payload)
    },
    logout: () => doLogout(),
    signOut: () => doLogout(),
  }), [user, loading, reload, setUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
