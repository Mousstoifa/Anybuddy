export type Company = {
  id: number
  name: string
  size: string
  sector: string
  logo: string
  description: string
  contact_email: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type CompanyEmployee = {
  id: number
  user: number
  company: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}
