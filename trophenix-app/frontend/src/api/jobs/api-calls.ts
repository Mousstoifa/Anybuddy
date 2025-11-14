import axiosInstance from '../axios'
import type {
  JobOffer,
  JobApplication,
  SavedJob,
  JobOfferFormData,
  JobApplicationFormData,
  JobSearchFilters,
} from '../../types/jobs'

export const getPublishedJobs = async (filters?: JobSearchFilters) => {
  const params: any = { status: 'published' }
  if (filters) {
    if (filters.contract_type) params.contract_type = filters.contract_type
    if (filters.location) params.location = filters.location
    if (filters.remote_possible !== undefined) params.remote_possible = filters.remote_possible
    if (filters.experience_level) params.experience_level = filters.experience_level
    if (filters.job_sector) params.job_sector = filters.job_sector
  }
  const { data } = await axiosInstance.get<JobOffer[]>('/job_offers/', { params })
  return data
}

export const getCompanyJobs = async (companyId: string) => {
  const { data } = await axiosInstance.get<JobOffer[]>('/job_offers/', { params: { company_id: companyId } })
  return data
}

export const getJobById = async (jobId: string) => {
  const { data } = await axiosInstance.get<JobOffer | null>(`/job_offers/${jobId}/`)
  return data
}

export const createJob = async (companyId: string, jobData: JobOfferFormData) => {
  const payload = { company_id: companyId, ...jobData, status: 'draft' }
  const { data } = await axiosInstance.post<JobOffer>('/job_offers/', payload)
  return data
}

export const updateJob = async (jobId: string, updates: Partial<JobOfferFormData>) => {
  const { data } = await axiosInstance.put<JobOffer>(`/job_offers/${jobId}/`, updates)
  return data
}

export const publishJob = async (jobId: string) => {
  const payload = { status: 'published', published_at: new Date().toISOString() }
  const { data } = await axiosInstance.put<JobOffer>(`/job_offers/${jobId}/`, payload)
  return data
}

export const closeJob = async (jobId: string) => {
  const { data } = await axiosInstance.put<JobOffer>(`/job_offers/${jobId}/`, { status: 'closed' })
  return data
}

export const deleteJob = async (jobId: string) => {
  await axiosInstance.delete(`/job_offers/${jobId}/`)
}

export const getAthleteApplications = async (athleteId: string) => {
  const { data } = await axiosInstance.get<JobApplication[]>('/job_applications/', { params: { athlete_id: athleteId } })
  return data
}

export const getJobApplications = async (jobId: string) => {
  const { data } = await axiosInstance.get<JobApplication[]>('/job_applications/', { params: { job_offer_id: jobId } })
  return data
}

export const applyToJob = async (athleteId: string, applicationData: JobApplicationFormData) => {
  const payload = { athlete_id: athleteId, ...applicationData, status: 'pending' }
  const { data } = await axiosInstance.post<JobApplication>('/job_applications/', payload)
  return data
}

export const updateApplicationStatus = async (applicationId: string, updates: Partial<JobApplicationFormData> & { status?: string }) => {
  const { data } = await axiosInstance.put<JobApplication>(`/job_applications/${applicationId}/`, updates)
  return data
}

export const saveJob = async (athleteId: string, jobId: string) => {
  const { data } = await axiosInstance.post<SavedJob>('/saved_jobs/', { athlete_id: athleteId, job_offer_id: jobId })
  return data
}

export const unsaveJob = async (athleteId: string, jobId: string) => {
  // Some backends accept DELETE with query params; fallback to DELETE by id is not available here.
  await axiosInstance.delete('/saved_jobs/', { params: { athlete_id: athleteId, job_offer_id: jobId } })
}

export const getSavedJobs = async (athleteId: string) => {
  const { data } = await axiosInstance.get<SavedJob[]>('/saved_jobs/', { params: { athlete_id: athleteId } })
  return data
}

export const hasApplied = async (athleteId: string, jobId: string) => {
  const { data } = await axiosInstance.get<JobApplication[]>('/job_applications/', { params: { athlete_id: athleteId, job_offer_id: jobId } })
  return Array.isArray(data) && data.length > 0
}

export const getAllJobs = async (params: Record<string, any> = {}) => {
  const { data } = await axiosInstance.get<JobOffer[]>('/job_offers/', { params })
  return data
}
