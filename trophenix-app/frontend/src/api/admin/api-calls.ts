import axios from '../axios';
import type {
  AdminRole,
  AdminTeamMemberWithDetails,
  AdminActivityLogWithDetails,
  InviteAdminData,
} from '../../types/admin';

const BASE = '/admin';

export async function getRoles(): Promise<AdminRole[]> {
  const res = await axios.get(`${BASE}/roles`);
  return res.data || [];
}

export async function getTeamMembers(): Promise<AdminTeamMemberWithDetails[]> {
  const res = await axios.get(`${BASE}/team-members`);
  return res.data || [];
}

export async function getTeamMemberByUserId(userId: string): Promise<AdminTeamMemberWithDetails | null> {
  const res = await axios.get(`${BASE}/team-members/user/${userId}`);
  return res.data || null;
}

export async function inviteAdmin(invitedBy: string, inviteData: InviteAdminData): Promise<void> {
  await axios.post(`${BASE}/invite`, { invitedBy, inviteData });
}

export async function updateMemberRole(memberId: string, roleId: string): Promise<void> {
  await axios.patch(`${BASE}/team-members/${memberId}/role`, { roleId });
}

export async function updateMemberStatus(memberId: string, status: 'active' | 'suspended'): Promise<void> {
  await axios.patch(`${BASE}/team-members/${memberId}/status`, { status });
}

export async function removeMember(memberId: string): Promise<void> {
  await axios.delete(`${BASE}/team-members/${memberId}`);
}

export async function getActivityLogs(limit = 100): Promise<AdminActivityLogWithDetails[]> {
  const res = await axios.get(`${BASE}/activity-logs`, { params: { limit } });
  return res.data || [];
}

export async function getCounts(): Promise<Record<string, number>> {
  const res = await axios.get(`${BASE}/counts`);
  return res.data || {};
}

export async function getPendingProfiles(): Promise<any[]> {
  const res = await axios.get(`${BASE}/pending-profiles`);
  return res.data || [];
}

export async function getProfiles(params: Record<string, any> = {}): Promise<any[]> {
  const res = await axios.get(`/profiles`, { params });
  return res.data || [];
}

export async function logAction(
  userId: string,
  action: string,
  targetType: string,
  targetId: string | null,
  details: Record<string, any> = {}
): Promise<void> {
  await axios.post(`${BASE}/activity-logs`, { userId, action, targetType, targetId, details });
}

export async function updateLastLogin(userId: string): Promise<void> {
  await axios.post(`${BASE}/team-members/${userId}/last-login`);
}

export async function checkPermission(userId: string, permission: string): Promise<boolean> {
  const res = await axios.get(`${BASE}/permissions/check`, { params: { userId, permission } });
  return res.data === true;
}

export async function hasAnyPermission(userId: string): Promise<boolean> {
  const res = await axios.get(`${BASE}/permissions/any`, { params: { userId } });
  return res.data === true;
}
