import { useApiCall } from '../hooks/useApiCall'
import * as api from './api-calls'

export function useGetAthlete() { return useApiCall(api.getAthlete) }
export function useFetchAthletes() { return useApiCall(api.fetchAthletes) }
