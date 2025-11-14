import axios from 'axios'

const BASE_URL = "https://127.0.0.1:8000/api/v1/" // can be overridden in tests

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      // backend uses Bearer tokens (SimpleJWT)
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
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
            originalRequest.headers = originalRequest.headers || {}
            originalRequest.headers.Authorization = `Bearer ${access}`
            return axios(originalRequest)
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
