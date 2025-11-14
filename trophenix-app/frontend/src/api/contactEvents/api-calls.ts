import axiosInstance from '../axios'

export const createContactEvent = async (payload: any) => {
  const { data } = await axiosInstance.post('/contact-events/', payload)
  return data
}

export default { createContactEvent }
