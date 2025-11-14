import axiosInstance from '../axios'
import type { Message, MessageThread, SendMessageFormData } from '../../types/messages'

export const sendMessage = async (senderId: string, payload: SendMessageFormData) => {
  const body = { sender_id: senderId, ...payload }
  const { data } = await axiosInstance.post<Message>('/messages/', body)
  return data
}

export const getUserMessages = async (userId: string) => {
  const { data } = await axiosInstance.get<Message[]>('/messages/', { params: { user_id: userId } })
  return data
}

export const getReceivedMessages = async (userId: string) => {
  const { data } = await axiosInstance.get<Message[]>('/messages/', { params: { recipient_id: userId } })
  return data
}

export const getSentMessages = async (userId: string) => {
  const { data } = await axiosInstance.get<Message[]>('/messages/', { params: { sender_id: userId } })
  return data
}

export const getUnreadMessages = async (userId: string) => {
  const { data } = await axiosInstance.get<Message[]>('/messages/', { params: { recipient_id: userId, read: false } })
  return data
}

export const getUnreadCount = async (userId: string) => {
  const { data } = await axiosInstance.get<number>('/messages/unread_count/', { params: { recipient_id: userId } })
  return data
}

export const markAsRead = async (messageId: string) => {
  const { data } = await axiosInstance.put<Message>(`/messages/${messageId}/`, { read: true, read_at: new Date().toISOString() })
  return data
}

export const markMultipleAsRead = async (messageIds: string[]) => {
  await axiosInstance.put('/messages/mark_multiple_read/', { ids: messageIds })
}

export const getUserThreads = async (userId: string) => {
  const { data } = await axiosInstance.get<MessageThread[]>('/message_threads/', { params: { user_id: userId } })
  return data
}

export const getConversation = async (user1Id: string, user2Id: string) => {
  const { data } = await axiosInstance.get<Message[]>('/messages/conversation/', { params: { user1: user1Id, user2: user2Id } })
  return data
}

export const deleteMessage = async (messageId: string) => {
  await axiosInstance.delete(`/messages/${messageId}/`)
}

export const getMessageById = async (messageId: string) => {
  const { data } = await axiosInstance.get<Message | null>(`/messages/${messageId}/`)
  return data
}
