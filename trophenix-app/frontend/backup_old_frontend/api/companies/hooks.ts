import { useApiCall } from '../hooks/useApiCall'
import * as api from './api-calls'

export function useCreateCompany() { return useApiCall(api.createCompany) }
export function useGetCompany() { return useApiCall(api.getCompany) }
export function useUpdateCompany() { return useApiCall(api.updateCompany) }
export function usePartialUpdateCompany() { return useApiCall(api.partialUpdateCompany) }

export function useCreateEmployee() { return useApiCall(api.createEmployee) }
export function useGetEmployee() { return useApiCall(api.getEmployee) }
export function useUpdateEmployee() { return useApiCall(api.updateEmployee) }
export function usePartialUpdateEmployee() { return useApiCall(api.partialUpdateEmployee) }
