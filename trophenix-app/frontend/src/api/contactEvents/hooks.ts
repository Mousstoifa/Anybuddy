import * as api from './api-calls'
import { useCallback } from 'react'

export function useCreateContactEvent() {
  return useCallback((payload: any) => api.createContactEvent(payload), [])
}

export default { useCreateContactEvent }
