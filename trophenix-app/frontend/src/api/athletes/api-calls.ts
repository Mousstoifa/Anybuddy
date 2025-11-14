import axiosInstance from '../axios'
import type { PaginatedResponseMixin, Athlete } from '../../types'

// General athlete endpoints
export const getAthlete = async () => {
  const { data } = await axiosInstance.get<Athlete | null>('/athletes/me/')
  return data
}

export const getAthleteById = async (id: number) => {
  const { data } = await axiosInstance.get<Athlete>(`/athletes/${id}/`)
  return data
}

export const fetchAthletes = async () => {
  const { data } = await axiosInstance.get<PaginatedResponseMixin<Athlete>>('/athletes/')
  return data
}

// Registration / profile helpers
export const saveSituation = async (payload: { situation: string }) => {
  const { data } = await axiosInstance.post('/athlete/situation/', payload)
  return data
}

export const saveType = async (payload: { type: string }) => {
  const { data } = await axiosInstance.post('/athlete/type/', payload)
  return data
}

export const saveClub = async (payload: { club: string; niveau: string; ministerielle: boolean }) => {
  const { data } = await axiosInstance.post('/athlete/club/', payload)
  return data
}

export const saveProject = async (payload: any) => {
  const { data } = await axiosInstance.post('/athlete/projet-pro/', payload)
  return data
}

export const saveProfile = async (payload: any) => {
  const { data } = await axiosInstance.post('/athlete/profil/', payload)
  return data
}

export const createAccount = async (payload: any) => {
  const { data } = await axiosInstance.post('/athlete/account/', payload)
  return data
}

// Email verification helpers (note: verification module also exposes these; consider de-duping re-exports)
export const sendVerificationCode = async (payload: { email: string }) => {
  const { data } = await axiosInstance.post('/athlete/send-code/', payload)
  return data
}

export const verifyEmail = async (payload: { verification_code: string }) => {
  const { data } = await axiosInstance.post('/athlete/verify-email/', payload)
  return data
}

export default {
  getAthlete,
  getAthleteById,
  fetchAthletes,
  saveSituation,
  saveType,
  saveClub,
  saveProject,
  saveProfile,
  createAccount,
  sendVerificationCode,
  verifyEmail,
}
