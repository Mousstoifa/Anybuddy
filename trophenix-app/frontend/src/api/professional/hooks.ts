import * as api from './api-calls'
import { useCallback } from 'react'

export function useSaveCompanyInformation() {
  return useCallback((payload: { nom_structure: string; secteur_activite: string }) => api.saveCompanyInformation(payload), [])
}

export function useSaveCompanyLocation() {
  return useCallback((payload: { id_profil: string; taille_structure: string; ville: string; email_contact: string }) => api.saveCompanyLocation(payload), [])
}

export function useSaveCompanyDescription() {
  return useCallback((payload: { id_profil: string; description: string }) => api.saveCompanyDescription(payload), [])
}

export function useGetCompanyProfile() {
  return useCallback((id: string) => api.getCompanyProfile(id), [])
}

export function useCreateProfessionalAccount() {
  return useCallback((payload: { id_profil: string; email: string; mot_de_passe: string; confirmation: string; accept_cgu: boolean }) => api.createProfessionalAccount(payload), [])
}

export default {
  useSaveCompanyInformation,
  useSaveCompanyLocation,
  useSaveCompanyDescription,
  useGetCompanyProfile,
  useCreateProfessionalAccount,
}