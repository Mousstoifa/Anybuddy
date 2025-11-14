# Auto-generated API Calls

| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| GET | /contexts/user/{userId} | gets user contexts | `userId` | [UserContext[]] |
| GET | /contexts/user/{userId}/primary | gets primary context for user | `userId` | [UserContext | null] |
| GET | /contexts/{contextId} | gets context by id | `contextId` | [UserContext | null] |
| GET | /organizations/{orgId} | gets organization by id | `orgId` | [CompanyOrganization | null] |
| GET | /delegations/{delegationId} | gets delegation by id | `delegationId` | [AthleteDelegation | null] |
| GET | /contexts/permissions | gets role permissions (by roleName and contextType) | `roleName, contextType` | [Record<string, boolean>] |
| POST | /organizations | creates an organization | `name, companyProfileId, ownerId` | [CompanyOrganization] |
| POST | /contexts/organizations/{organizationId}/invite | invites a member to organization | `organizationId, userEmail, role, invitedBy` | [void] |
| POST | /contexts/user-contexts/{contextId}/accept | accepts organization invite for context | `contextId` | [void] |
| POST | /delegations/invite | invites a delegate | `athleteProfileId, delegateEmail, role, invitedBy` | [void] |
| POST | /delegations/{delegationId}/accept | accepts a delegation invite | `delegationId` | [void] |
| GET | /contexts/organizations/{organizationId}/members | gets organization members | `organizationId` | [any[]] |
| GET | /delegations/athlete/{athleteProfileId} | gets athlete delegates | `athleteProfileId` | [any[]] |
| PATCH | /contexts/user-contexts/{contextId} | remove (suspend) a member | `contextId` | [void] |
| PATCH | /delegations/{delegationId} | revoke a delegation | `delegationId` | [void] |
| POST | /contexts/user/{userId}/primary | sets primary context for a user | `userId, contextId` | [void] |
