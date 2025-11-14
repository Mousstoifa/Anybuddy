import * as api from './api-calls'
import { useApiCall } from '../hooks/useApiCall'

export function useSaveSituation() { return useApiCall(api.saveSituation) }
export function useSaveType() { return useApiCall(api.saveType) }
export function useSaveClub() { return useApiCall(api.saveClub) }
export function useSaveProject() { return useApiCall(api.saveProject) }
export function useSaveProfile() { return useApiCall(api.saveProfile) }
export function useCreateAccount() { return useApiCall(api.createAccount) }
export function useSendVerificationCode() { return useApiCall(api.sendVerificationCode) }
export function useVerifyEmail() { return useApiCall(api.verifyEmail) }

// Read hooks
export function useGetAthlete() { return useApiCall(api.getAthlete) }
export function useGetAthleteById() { return useApiCall(api.getAthleteById) }
export function useFetchAthletes() { return useApiCall(api.fetchAthletes) }

export default {
  useSaveSituation,
  useSaveType,
  useSaveClub,
  useSaveProject,
  useSaveProfile,
  useCreateAccount,
  useSendVerificationCode,
  useVerifyEmail,
  useGetAthlete,
  useGetAthleteById,
  useFetchAthletes,
}
