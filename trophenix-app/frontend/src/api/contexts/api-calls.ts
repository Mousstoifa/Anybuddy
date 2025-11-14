import axios from '../axios';
import type {
  UserContext,
  CompanyOrganization,
  AthleteDelegation
} from '../../types/contexts';

const BASE = '/contexts';

export async function getUserContexts(userId: string): Promise<UserContext[]> {
  const res = await axios.get(`${BASE}/user/${userId}`);
  return res.data || [];
}

export async function getPrimaryContext(userId: string): Promise<UserContext | null> {
  const res = await axios.get(`${BASE}/user/${userId}/primary`);
  return res.data || null;
}

export async function getContextById(contextId: string): Promise<UserContext | null> {
  const res = await axios.get(`${BASE}/${contextId}`);
  return res.data || null;
}

export async function getOrganization(orgId: string): Promise<CompanyOrganization | null> {
  const res = await axios.get(`/organizations/${orgId}`);
  return res.data || null;
}

export async function getDelegation(delegationId: string): Promise<AthleteDelegation | null> {
  const res = await axios.get(`/delegations/${delegationId}`);
  return res.data || null;
}

export async function getRolePermissions(roleName: string, contextType: string): Promise<Record<string, boolean>> {
  const res = await axios.get(`${BASE}/permissions`, { params: { roleName, contextType } });
  return res.data || {};
}

export async function createOrganization(name: string, companyProfileId: string, ownerId: string): Promise<CompanyOrganization> {
  const res = await axios.post(`/organizations`, { name, companyProfileId, ownerId });
  return res.data;
}

export async function inviteMemberToOrganization(organizationId: string, userEmail: string, role: string, invitedBy: string): Promise<void> {
  await axios.post(`${BASE}/organizations/${organizationId}/invite`, { userEmail, role, invitedBy });
}

export async function acceptOrganizationInvite(contextId: string): Promise<void> {
  await axios.post(`${BASE}/user-contexts/${contextId}/accept`);
}

export async function inviteDelegate(athleteProfileId: string, delegateEmail: string, role: string, invitedBy: string): Promise<void> {
  await axios.post(`/delegations/invite`, { athleteProfileId, delegateEmail, role, invitedBy });
}

export async function acceptDelegationInvite(delegationId: string): Promise<void> {
  await axios.post(`/delegations/${delegationId}/accept`);
}

export async function getOrganizationMembers(organizationId: string) {
  const res = await axios.get(`${BASE}/organizations/${organizationId}/members`);
  return res.data || [];
}

export async function getAthleteDelegates(athleteProfileId: string) {
  const res = await axios.get(`/delegations/athlete/${athleteProfileId}`);
  return res.data || [];
}

export async function removeMember(contextId: string): Promise<void> {
  await axios.patch(`${BASE}/user-contexts/${contextId}`, { status: 'suspended' });
}

export async function revokeDelegate(delegationId: string): Promise<void> {
  await axios.patch(`/delegations/${delegationId}`, { status: 'revoked' });
}

export async function setPrimaryContext(userId: string, contextId: string): Promise<void> {
  await axios.post(`${BASE}/user/${userId}/primary`, { contextId });
}
