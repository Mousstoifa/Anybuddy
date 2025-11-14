import React, { createContext, useContext, useMemo } from 'react'
import { useAuthState, loginAndStore, logout as doLogout } from './useAuth'
import type { User } from '@/trophenix/types'

type AuthContextValue = {
  user: User | null
  loading: boolean
  reload: () => Promise<void>
  login: (email: string, password: string) => Promise<any>
  logout: () => void
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
        const me = await (await import('./api-calls')).me()
        setUser(me)
      } catch (err) {
        // ignore
      }
      return tokens
    },
    logout: () => doLogout(),
  }), [user, loading, reload, setUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
