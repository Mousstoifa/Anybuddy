import axiosInstance from '../axios'
import type { AuthTokens, User } from '@/trophenix/types'

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await axiosInstance.post<AuthTokens>('/auth/login/', payload)
  return data
}

export const refresh = async (payload: { refresh: string }) => {
  const { data } = await axiosInstance.post<AuthTokens>('/auth/login/refresh/', payload)
  return data
}

export const me = async () => {
  const { data } = await axiosInstance.get<User | null>('/auth/me/')
  return data
}

export const register = async (payload: { email: string; password: string; first_name?: string; last_name?: string }) => {
  const { data } = await axiosInstance.post<User>('/auth/register/', payload)
  return data
}
