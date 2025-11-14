import axiosInstance from '../axios'

export const createProfile = async (payload: any) => {
  const { data } = await axiosInstance.post('/profiles/', payload)
  return data
}

export const createAthleteProfile = async (payload: any) => {
  const { data } = await axiosInstance.post('/athlete-profiles/', payload)
  return data
}

export const createCompanyProfile = async (payload: any) => {
  const { data } = await axiosInstance.post('/company-profiles/', payload)
  return data
}

export const updateProfileStatus = async (profileId: string, status: string) => {
  const { data } = await axiosInstance.patch(`/profiles/${profileId}/status`, { status })
  return data
}

export const deleteProfile = async (profileId: string) => {
  await axiosInstance.delete(`/profiles/${profileId}/`)
}

export const getProfiles = async (params: Record<string, any> = {}) => {
  const { data } = await axiosInstance.get('/profiles/', { params })
  return data
}

export default {
  createProfile,
  createAthleteProfile,
  createCompanyProfile,
  updateProfileStatus,
}
