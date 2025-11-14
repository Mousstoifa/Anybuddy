import * as api from '../api/messages/api-calls'
import type {
  Message,
  MessageThread,
  SendMessageFormData,
  SendMessageResult,
} from '../types/messages';

export class MessageService {
  /**
   * Envoie un message
   */
  static async sendMessage(
    senderId: string,
    messageData: SendMessageFormData
  ): Promise<SendMessageResult> {
    try {
      const data = await api.sendMessage(senderId, messageData)
      return { success: true, message: data }
    } catch (error: any) {
      console.error('Error sending message:', error)
      return { success: false, error: error?.message || String(error) }
    }
  }

  /**
   * Récupère tous les messages d'un utilisateur (envoyés et reçus)
   */
  static async getUserMessages(userId: string): Promise<Message[]> {
    return await api.getUserMessages(userId)
  }

  /**
   * Récupère les messages reçus par un utilisateur
   */
  static async getReceivedMessages(userId: string): Promise<Message[]> {
    return await api.getReceivedMessages(userId)
  }

  /**
   * Récupère les messages envoyés par un utilisateur
   */
  static async getSentMessages(userId: string): Promise<Message[]> {
    return await api.getSentMessages(userId)
  }

  /**
   * Récupère les messages non lus d'un utilisateur
   */
  static async getUnreadMessages(userId: string): Promise<Message[]> {
    return await api.getUnreadMessages(userId)
  }

  /**
   * Compte les messages non lus d'un utilisateur
   */
  static async getUnreadCount(userId: string): Promise<number> {
    return await api.getUnreadCount(userId)
  }

  /**
   * Marque un message comme lu
   */
  static async markAsRead(messageId: string): Promise<Message> {
    return await api.markAsRead(messageId)
  }

  /**
   * Marque plusieurs messages comme lus
   */
  static async markMultipleAsRead(messageIds: string[]): Promise<void> {
    return await api.markMultipleAsRead(messageIds)
  }

  /**
   * Récupère les threads de conversation d'un utilisateur
   */
  static async getUserThreads(userId: string): Promise<MessageThread[]> {
    return await api.getUserThreads(userId)
  }

  /**
   * Récupère les messages d'une conversation entre deux utilisateurs
   */
  static async getConversation(
    user1Id: string,
    user2Id: string
  ): Promise<Message[]> {
    return await api.getConversation(user1Id, user2Id)
  }

  /**
   * Supprime un message (soft delete - marque comme supprimé côté expéditeur)
   */
  static async deleteMessage(messageId: string): Promise<void> {
    return await api.deleteMessage(messageId)
  }

  /**
   * Récupère un message par ID
   */
  static async getMessageById(messageId: string): Promise<Message | null> {
    return await api.getMessageById(messageId)
  }
}
