import * as api from '../api/admin/api-calls';
import type {
  AdminRole,
  AdminTeamMemberWithDetails,
  AdminActivityLogWithDetails,
  InviteAdminData,
} from '../types/admin';

export class AdminService {
  static async getRoles(): Promise<AdminRole[]> {
    return api.getRoles();
  }

  static async getTeamMembers(): Promise<AdminTeamMemberWithDetails[]> {
    const members = await api.getTeamMembers();
    return (members || []).map((member: any) => ({
      ...member,
      role: member.role,
      email: member.profile?.email || '',
      first_name: member.profile?.first_name,
      last_name: member.profile?.last_name,
    }));
  }

  static async getTeamMemberByUserId(userId: string): Promise<AdminTeamMemberWithDetails | null> {
    const data = await api.getTeamMemberByUserId(userId);
    if (!data) return null;
    const d: any = data;
    return {
      ...d,
      role: d.role,
      email: d.profile?.email || '',
      first_name: d.profile?.first_name,
      last_name: d.profile?.last_name,
    };
  }

  static async inviteAdmin(invitedBy: string, inviteData: InviteAdminData): Promise<void> {
    await api.inviteAdmin(invitedBy, inviteData);
    // backend should handle validations and logging
  }

  static async updateMemberRole(memberId: string, roleId: string): Promise<void> {
    return api.updateMemberRole(memberId, roleId);
  }

  static async updateMemberStatus(memberId: string, status: 'active' | 'suspended'): Promise<void> {
    return api.updateMemberStatus(memberId, status);
  }

  static async removeMember(memberId: string): Promise<void> {
    return api.removeMember(memberId);
  }

  static async getActivityLogs(limit = 100): Promise<AdminActivityLogWithDetails[]> {
    const data = await api.getActivityLogs(limit);
    return (data || []).map((log: any) => ({
      ...log,
      admin: log.admin?.profile ? {
        email: log.admin.profile.email,
        first_name: log.admin.profile.first_name,
        last_name: log.admin.profile.last_name,
      } : null,
    }));
  }

  static async logAction(
    userId: string,
    action: string,
    targetType: string,
    targetId: string | null,
    details: Record<string, any> = {}
  ): Promise<void> {
    return api.logAction(userId, action, targetType, targetId, details);
  }

  static async updateLastLogin(userId: string): Promise<void> {
    return api.updateLastLogin(userId);
  }

  static async checkPermission(
    userId: string,
    permission: keyof AdminRole['permissions']
  ): Promise<boolean> {
    // delegate to backend check to avoid fetching full member client-side
    return api.checkPermission(userId, permission as string);
  }

  static async hasAnyPermission(userId: string): Promise<boolean> {
    return api.hasAnyPermission(userId);
  }
}
