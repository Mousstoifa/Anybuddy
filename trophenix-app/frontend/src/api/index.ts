// Export all API modules
export * from './auth'
export * from './athletes'
export * from './companies'
export * from './confidences'
export * from './professional'
// verification exports conflict with athletes (sendVerificationCode / verifyEmail)
// Export verification as a named module to avoid duplicate named exports.
export * as verification from './verification'
export * from './hooks'

// Export axios instance
export { default as axiosInstance } from './axios'