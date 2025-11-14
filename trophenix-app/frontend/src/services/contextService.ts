import * as api from '../api/contexts/api-calls';
import type {
  UserContext,
  CompanyOrganization,
  AthleteDelegation,
  ActiveContext,
} from '../types/contexts';

export class ContextService {
  static async getUserContexts(userId: string): Promise<UserContext[]> {
    return api.getUserContexts(userId);
  }

  static async getPrimaryContext(userId: string): Promise<UserContext | null> {
    return api.getPrimaryContext(userId);
  }

  static async getContextById(contextId: string): Promise<UserContext | null> {
    return api.getContextById(contextId);
  }

  static async getOrganization(orgId: string): Promise<CompanyOrganization | null> {
    return api.getOrganization(orgId);
  }

  static async getDelegation(delegationId: string): Promise<AthleteDelegation | null> {
    return api.getDelegation(delegationId);
  }

  static async getRolePermissions(roleName: string, contextType: string): Promise<Record<string, boolean>> {
    return api.getRolePermissions(roleName, contextType);
  }

  static async getActiveContextDetails(context: UserContext): Promise<ActiveContext> {
    let organization: CompanyOrganization | undefined;
    let delegation: AthleteDelegation | undefined;

    if (context.context_type === 'company_org' && context.context_id) {
      organization = await this.getOrganization(context.context_id) || undefined;
    }

    if (context.context_type === 'athlete_delegation' && context.context_id) {
      delegation = await this.getDelegation(context.context_id) || undefined;
    }

  const permissions = await this.getRolePermissions(context.role, context.context_type);

    return {
      context,
      organization,
      delegation,
      permissions
    };
  }

  static async createOrganization(
    name: string,
    companyProfileId: string,
    ownerId: string
  ): Promise<CompanyOrganization> {
    return api.createOrganization(name, companyProfileId, ownerId);
  }

  static async inviteMemberToOrganization(
    organizationId: string,
    userEmail: string,
    role: string,
    invitedBy: string
  ): Promise<void> {
    return api.inviteMemberToOrganization(organizationId, userEmail, role, invitedBy);
  }

  static async acceptOrganizationInvite(contextId: string): Promise<void> {
    return api.acceptOrganizationInvite(contextId);
  }

  static async inviteDelegate(
    athleteProfileId: string,
    delegateEmail: string,
    role: 'guardian' | 'agent' | 'manager' | 'coach',
    invitedBy: string
  ): Promise<void> {
    return api.inviteDelegate(athleteProfileId, delegateEmail, role, invitedBy);
  }

  static async acceptDelegationInvite(delegationId: string): Promise<void> {
    return api.acceptDelegationInvite(delegationId);
  }

  static async getOrganizationMembers(organizationId: string) {
    return api.getOrganizationMembers(organizationId);
  }

  static async getAthleteDelegates(athleteProfileId: string) {
    return api.getAthleteDelegates(athleteProfileId);
  }

  static async removeMember(contextId: string): Promise<void> {
    return api.removeMember(contextId);
  }

  static async revokeDelegate(delegationId: string): Promise<void> {
    return api.revokeDelegate(delegationId);
  }

  static async setPrimaryContext(userId: string, contextId: string): Promise<void> {
    return api.setPrimaryContext(userId, contextId);
  }
}
