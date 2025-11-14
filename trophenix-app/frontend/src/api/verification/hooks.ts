import { useApiCall } from '../hooks/useApiCall'
import * as api from './api-calls'

export function useVerifyEmail() {
  return useApiCall(api.verifyEmail)
}

export function useSendVerificationCode() {
  return useApiCall(api.sendVerificationCode)
}