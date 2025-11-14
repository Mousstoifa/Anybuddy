import * as api from './api-calls'
import { useCallback } from 'react'

export function useCreateProfile() {
  return useCallback((payload: any) => api.createProfile(payload), [])
}

export function useCreateAthleteProfile() {
  return useCallback((payload: any) => api.createAthleteProfile(payload), [])
}

export function useCreateCompanyProfile() {
  return useCallback((payload: any) => api.createCompanyProfile(payload), [])
}

export default {
  useCreateProfile,
  useCreateAthleteProfile,
  useCreateCompanyProfile,
}
