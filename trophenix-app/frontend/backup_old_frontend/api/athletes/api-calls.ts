import type { PaginatedResponseMixin, Athlete } from '@/trophenix/types'

import axiosInstance from '../axios'

export const getAthlete = async () => {
  const { data } = await axiosInstance.get<Athlete | null>('/athletes/me/')
  return data
}

export const getAthleteById = async (id: number) => {
  const { data } = await axiosInstance.get<Athlete>(`/athletes/${id}/`)
  return data
}

export const fetchAthletes = async () => {
  const { data } =
    await axiosInstance.get<PaginatedResponseMixin<Athlete>>('/athletes/')
  return data
}
