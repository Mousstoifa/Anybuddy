import axiosInstance from '../axios'

// Email verification endpoints for athlete registration
export const verifyEmail = async (payload: {
  verification_code: string;
}) => {
  const { data } = await axiosInstance.post('/athlete/verify-email/', payload)
  return data
}

export const sendVerificationCode = async (payload: {
  email: string;
}) => {
  const { data } = await axiosInstance.post('/athlete/send-code/', payload)
  return data
}