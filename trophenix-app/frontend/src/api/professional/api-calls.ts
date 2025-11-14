import axiosInstance from '../axios'

export const saveCompanyInformation = async (payload: {
  nom_structure: string
  secteur_activite: string
}) => {
  const { data } = await axiosInstance.post('/professionnel/informations/', payload)
  return data
}

export const saveCompanyLocation = async (payload: {
  id_profil: string
  taille_structure: string
  ville: string
  email_contact: string
}) => {
  const { data } = await axiosInstance.post('/professionnel/localisation/', payload)
  return data
}

export const saveCompanyDescription = async (payload: {
  id_profil: string
  description: string
}) => {
  const { data } = await axiosInstance.post('/professionnel/description/', payload)
  return data
}

export const getCompanyProfile = async (id: string) => {
  const { data } = await axiosInstance.get(`/professionnel/profil/${id}/`)
  return data
}

// Final registration with credentials
export const createProfessionalAccount = async (payload: {
  id_profil: string
  email: string
  mot_de_passe: string
  confirmation: string
  accept_cgu: boolean
}) => {
  const { data } = await axiosInstance.post('/auth/register/', payload)
  return data
}

export default {
  saveCompanyInformation,
  saveCompanyLocation,
  saveCompanyDescription,
  getCompanyProfile,
  createProfessionalAccount,
}