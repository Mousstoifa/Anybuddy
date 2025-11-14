import * as messagesApi from '../api/messages/api-calls';
import type {
  ContextMessage,
  MessageContextType,
  MessageVisibility
} from '../types/contexts';

export class ContextMessageService {
  static async sendMessage(
    contextType: MessageContextType,
    contextId: string,
    senderId: string,
    senderRole: string | null,
    subject: string,
    content: string,
    visibility: MessageVisibility = 'all',
    visibleToRoles: string[] = []
  ): Promise<ContextMessage> {
    const payload = {
      context_type: contextType,
      context_id: contextId,
      subject,
      content,
      visibility,
      visible_to_roles: visibleToRoles,
      sender_role: senderRole,
      recipient_id: null,
    } as any;

    // messagesApi.sendMessage expects senderId and payload
    const data = await messagesApi.sendMessage(senderId, payload);
    // backend Message shape may not include all ContextMessage fields; cast safely via unknown
    return data as unknown as ContextMessage;
  }

  static async getMessagesByContext(
    contextType: MessageContextType,
    contextId: string
  ): Promise<ContextMessage[]> {
    // Reuse messages API - pass context filters
    const data = await messagesApi.getUserMessages('');
    // Filter by context locally if backend endpoint doesn't support context queries
  const filtered = (data || []).filter((m: any) => m.context_type === contextType && m.context_id === contextId);
    // Sort descending by sent_at
    filtered.sort((a: any, b: any) => (b.sent_at || 0) - (a.sent_at || 0));
    return filtered as unknown as ContextMessage[];
  }

  static async markAsRead(messageId: string, userId: string): Promise<void> {
    try {
      // userId is not currently used by the messages API; keep signature for future use
      void userId;
      await messagesApi.markAsRead(messageId);
    } catch (err) {
      // Backend may already mark as read; ignore duplicate-like errors
      console.error('markAsRead error', err);
    }
  }

  static async getReadStatus(messageId: string, userId: string): Promise<boolean> {
    // Try to fetch message and check if read flag exists for this user
    try {
      const message = await messagesApi.getMessageById(messageId);
      if (!message) return false;
      // message.read could be boolean; if per-user reads are stored, backend should expose it
      // Fallback: if API provides readers list, check membership
      if (message.read && message.read === true) return true;
      if (Array.isArray((message as any).readers)) {
        return ((message as any).readers as string[]).includes(userId);
      }
      return false;
    } catch (err) {
      console.error('getReadStatus error', err);
      return false;
    }
  }

  static async getUnreadCount(userId: string, contextType?: MessageContextType): Promise<number> {
    try {
      // Use messages API to get unread count per recipient
      const data = await messagesApi.getUnreadCount(userId);
      if (typeof data === 'number') return data;
      // Fallback: compute from messages if backend doesn't provide count
      const all = await messagesApi.getUserMessages(userId);
      const filtered = (all || []).filter((m: any) => !m.read && (!contextType || m.context_type === contextType));
      return filtered.length;
    } catch (err) {
      console.error('getUnreadCount error', err);
      return 0;
    }
  }

  static async getOrganizationMessages(organizationId: string): Promise<ContextMessage[]> {
    return this.getMessagesByContext('organization', organizationId);
  }

  static async getDelegationMessages(delegationId: string): Promise<ContextMessage[]> {
    return this.getMessagesByContext('delegation', delegationId);
  }

  static async getApplicationMessages(applicationId: string): Promise<ContextMessage[]> {
    return this.getMessagesByContext('application', applicationId);
  }

  static async sendInternalNote(
    contextType: MessageContextType,
    contextId: string,
    senderId: string,
    senderRole: string,
    subject: string,
    content: string,
    visibleToRoles: string[]
  ): Promise<ContextMessage> {
    return this.sendMessage(
      contextType,
      contextId,
      senderId,
      senderRole,
      subject,
      content,
      'specific_roles',
      visibleToRoles
    );
  }
}
