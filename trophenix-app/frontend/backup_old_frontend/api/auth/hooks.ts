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
