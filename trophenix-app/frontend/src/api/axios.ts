import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// Use a relative API base so the Vite dev server proxy can forward requests to the backend
// Vite exposes env vars via import.meta.env. VITE_API_BASE can override this in env files.
const BASE_URL = (import.meta.env.VITE_API_BASE as string) || '/api/v1/'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken && config.headers) {
      // backend uses Bearer tokens (SimpleJWT)
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          // Use the backend refresh endpoint. Use axios (not axiosInstance) to avoid interceptor loops.
          const refreshUrl = `${BASE_URL?.replace(/\/$/, '') || ''}/auth/login/refresh/`
          const { data } = await axios.post(refreshUrl, { refresh: refreshToken })
          // Backend returns { access, refresh? }
          const access = data?.access || data?.accessToken || null
          const refresh = data?.refresh || data?.refreshToken || null
          if (access) {
            localStorage.setItem('accessToken', access)
            if (refresh) localStorage.setItem('refreshToken', refresh)
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${access}`
            }
            return axiosInstance(originalRequest)
          }
        } catch (err) {
          console.error('Refresh token expired or invalid:', err)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
