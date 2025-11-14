export type Confidence = {
  id: number
  athlete: number
  title: string
  description: string
  category: string
  audio_file: string
  cover_image: string
  likes_count: number
  is_liked: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export type ConfidenceComment = {
  id: number
  confidence: number
  content: string
  athlete: number
  is_liked: boolean
  likes_count: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}
