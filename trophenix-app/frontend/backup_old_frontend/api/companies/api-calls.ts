import axiosInstance from '../axios'
import type { Company, CompanyEmployee } from '@/trophenix/types'

// Companies
export const createCompany = async (payload: Partial<Company>) => {
  const { data } = await axiosInstance.post<Company>('/companies/', payload)
  return data
}

export const getCompany = async (id: number) => {
  const { data } = await axiosInstance.get<Company>(`/companies/${id}/`)
  return data
}

export const updateCompany = async (id: number, payload: Partial<Company>) => {
  const { data } = await axiosInstance.put<Company>(`/companies/${id}/`, payload)
  return data
}

export const partialUpdateCompany = async (id: number, payload: Partial<Company>) => {
  const { data } = await axiosInstance.patch<Company>(`/companies/${id}/`, payload)
  return data
}

// Company Employees
export const createEmployee = async (payload: Partial<CompanyEmployee>) => {
  const { data } = await axiosInstance.post<CompanyEmployee>('/companies/employees/', payload)
  return data
}

export const getEmployee = async (id: number) => {
  const { data } = await axiosInstance.get<CompanyEmployee>(`/companies/employees/${id}/`)
  return data
}

export const updateEmployee = async (id: number, payload: Partial<CompanyEmployee>) => {
  const { data } = await axiosInstance.put<CompanyEmployee>(`/companies/employees/${id}/`, payload)
  return data
}

export const partialUpdateEmployee = async (id: number, payload: Partial<CompanyEmployee>) => {
  const { data } = await axiosInstance.patch<CompanyEmployee>(`/companies/employees/${id}/`, payload)
  return data
}
