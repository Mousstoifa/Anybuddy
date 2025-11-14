import { useApiCall } from '../hooks/useApiCall'
import * as api from './api-calls'

export function useLogin() {
  return useApiCall(api.login)
}

export function useRefresh() {
  return useApiCall(api.refresh)
}

export function useMe() {
  return useApiCall(api.me)
}

export function useRegister() {
  return useApiCall(api.register)
}

export function useSelectAccountType() {
  return useApiCall(api.selectAccountType)
}

export function useForgotPassword() {
  return useApiCall(api.forgotPassword)
}

export function useResetPassword() {
  return useApiCall(api.resetPassword)
}
