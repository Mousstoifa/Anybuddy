import axiosInstance from '../axios'
import type { AuthTokens, User } from '../../types'

// Existing auth endpoints
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

// New account type selection endpoint
export const selectAccountType = async (payload: { type_compte: 'professionnel' | 'sportif' }) => {
  const { data } = await axiosInstance.post('/auth/select-account-type/', payload)
  return data
}

// Password reset endpoints
export const forgotPassword = async (payload: { email: string }) => {
  const { data } = await axiosInstance.post('/auth/oubli-mdp/', payload)
  return data
}

export const resetPassword = async (payload: { token: string; nouveau_mot_de_passe: string }) => {
  const { data } = await axiosInstance.post('/auth/reinitialisation-mdp/', payload)
  return data
}
