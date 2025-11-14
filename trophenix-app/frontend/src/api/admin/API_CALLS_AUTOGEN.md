# Auto-generated API Calls

| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| GET | /admin/roles | gets roles |  | [AdminRole[]] |
| GET | /admin/team-members | gets team members |  | [AdminTeamMemberWithDetails[]] |
| GET | /admin/team-members/user/{userId} | gets team member by user id | `userId` | [AdminTeamMemberWithDetails | null] |
| POST | /admin/invite | invites an admin (send invite) | `invitedBy, inviteData` | [void] |
| PATCH | /admin/team-members/{memberId}/role | updates member role | `memberId, roleId` | [void] |
| PATCH | /admin/team-members/{memberId}/status | updates member status ('active'|'suspended') | `memberId, status` | [void] |
| DELETE | /admin/team-members/{memberId} | removes member | `memberId` | [void] |
| GET | /admin/activity-logs | gets activity logs | `limit = 100` | [AdminActivityLogWithDetails[]] |
| GET | /admin/counts | gets admin counts/metrics |  | [Record<string, number>] |
| GET | /admin/pending-profiles | gets pending profiles |  | [any[]] |
| GET | /profiles | gets profiles (filtered by params) | `params` | [any[]] |
| POST | /admin/activity-logs | logs an admin action | `userId, action, targetType, targetId, details` | [void] |
| POST | /admin/team-members/{userId}/last-login | updates last-login timestamp for a team member | `userId` | [void] |
| GET | /admin/permissions/check | checks whether a user has a permission | `userId, permission` | [boolean] |
| GET | /admin/permissions/any | checks whether a user has any permission | `userId` | [boolean] |
