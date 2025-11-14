import axiosInstance from '../axios'
import type { Confidence, ConfidenceComment } from '@/trophenix/types'
import type { PaginatedResponseMixin } from '@/trophenix/types'

export const listConfidences = async (params?: Record<string, any>) => {
  const { data } = await axiosInstance.get<PaginatedResponseMixin<Confidence>>('/confidences/', { params })
  return data
}

export const createConfidence = async (payload: Partial<Confidence>) => {
  const { data } = await axiosInstance.post<Confidence>('/confidences/', payload)
  return data
}

export const getConfidence = async (id: number) => {
  const { data } = await axiosInstance.get<Confidence>(`/confidences/${id}/`)
  return data
}

export const updateConfidence = async (id: number, payload: Partial<Confidence>) => {
  const { data } = await axiosInstance.put<Confidence>(`/confidences/${id}/`, payload)
  return data
}

export const partialUpdateConfidence = async (id: number, payload: Partial<Confidence>) => {
  const { data } = await axiosInstance.patch<Confidence>(`/confidences/${id}/`, payload)
  return data
}

export const deleteConfidence = async (id: number) => {
  const resp = await axiosInstance.delete<void>(`/confidences/${id}/`)
  // axios returns empty string for 204 on some runtimes; normalize to undefined
  return (resp as any).data === '' ? undefined : (resp as any).data
}

// Comments
export const listComments = async (confidenceId: number) => {
  const { data } = await axiosInstance.get<ConfidenceComment[]>(`/confidences/${confidenceId}/comments/`)
  return data
}

export const createComment = async (confidenceId: number, payload: Partial<ConfidenceComment>) => {
  const { data } = await axiosInstance.post<ConfidenceComment>(`/confidences/${confidenceId}/comments/`, payload)
  return data
}

export const updateComment = async (id: number, payload: Partial<ConfidenceComment>) => {
  const { data } = await axiosInstance.put<ConfidenceComment>(`/confidences/comments/${id}/`, payload)
  return data
}

export const partialUpdateComment = async (id: number, payload: Partial<ConfidenceComment>) => {
  const { data } = await axiosInstance.patch<ConfidenceComment>(`/confidences/comments/${id}/`, payload)
  return data
}

export const deleteComment = async (id: number) => {
  const { data } = await axiosInstance.delete<void>(`/confidences/comments/${id}/`)
  return data
}

// Likes
export const likeConfidence = async (id: number) => {
  const { data } = await axiosInstance.post(`/confidences/${id}/like/`)
  return data
}

export const unlikeConfidence = async (id: number) => {
  const { data } = await axiosInstance.delete(`/confidences/${id}/like/`)
  return data
}

export const likeComment = async (id: number) => {
  const { data } = await axiosInstance.post(`/confidences/comments/${id}/like/`)
  return data
}

export const unlikeComment = async (id: number) => {
  const { data } = await axiosInstance.delete(`/confidences/comments/${id}/like/`)
  return data
}

// Stream URL helpers
export const generateStreamUrl = async (id: number) => {
  const { data } = await axiosInstance.get<{ url: string }>(`/confidences/${id}/generate-stream-url/`)
  return data
}

export const saveStreamUrl = async (id: number, payload: { url: string }) => {
  const { data } = await axiosInstance.post(`/confidences/${id}/save-stream-url/`, payload)
  return data
}
