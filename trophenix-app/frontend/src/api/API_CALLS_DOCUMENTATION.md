# API calls documentation

## admin


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



## athletes


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| GET | /athletes/me/ | gets current athlete profile |  | [Athlete | null] |
| GET | /athletes/{id}/ | gets athlete by id | `id` | [Athlete] |
| GET | /athletes/ | fetches paginated athletes list |  | [PaginatedResponseMixin<Athlete>] |
| POST | /athlete/situation/ | saves athlete situation | `payload: { situation: string }` | [any] |
| POST | /athlete/type/ | saves athlete type | `payload: { type: string }` | [any] |
| POST | /athlete/club/ | saves athlete club info | `payload: { club: string, niveau: string, ministerielle: boolean }` | [any] |
| POST | /athlete/projet-pro/ | saves project (professional) | `payload: any` | [any] |
| POST | /athlete/profil/ | saves athlete profile | `payload: any` | [any] |
| POST | /athlete/account/ | creates an athlete account | `payload: any` | [any] |
| POST | /athlete/send-code/ | sends verification code to email | `payload: { email: string }` | [any] |
| POST | /athlete/verify-email/ | verifies email with code | `payload: { verification_code: string }` | [any] |



## auth


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /auth/login/ | logs a user in and returns tokens | `payload: { email, password }` | [AuthTokens] |
| POST | /auth/login/refresh/ | refreshes auth tokens | `payload: { refresh }` | [AuthTokens] |
| GET | /auth/me/ | gets current user info |  | [User | null] |
| POST | /auth/register/ | registers a new user | `payload: { email, password, first_name?, last_name? }` | [User] |
| POST | /auth/select-account-type/ | selects account type for user | `payload: { type_compte: 'professionnel'|'sportif' }` | [any] |
| POST | /auth/oubli-mdp/ | forgot password (send reset) | `payload: { email }` | [any] |
| POST | /auth/reinitialisation-mdp/ | reset password using token | `payload: { token, nouveau_mot_de_passe }` | [any] |



## companies


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /companies/ | creates a company | `payload: Partial<Company>` | [Company] |
| GET | /companies/{id}/ | gets a company by id | `id` | [Company] |
| PUT | /companies/{id}/ | updates a company (full) | `id, payload` | [Company] |
| PATCH | /companies/{id}/ | partial updates a company | `id, payload` | [Company] |
| POST | /companies/employees/ | creates a company employee | `payload: Partial<CompanyEmployee>` | [CompanyEmployee] |
| GET | /companies/employees/{id}/ | gets a company employee by id | `id` | [CompanyEmployee] |
| PUT | /companies/employees/{id}/ | updates a company employee (full) | `id, payload` | [CompanyEmployee] |
| PATCH | /companies/employees/{id}/ | partial updates a company employee | `id, payload` | [CompanyEmployee] |



## confidences


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| GET | /confidences/ | lists confidences (paginated) | `params?` | [PaginatedResponseMixin<Confidence>] |
| POST | /confidences/ | creates a confidence | `payload: Partial<Confidence>` | [Confidence] |
| GET | /confidences/{id}/ | gets a confidence by id | `id` | [Confidence] |
| PUT | /confidences/{id}/ | updates a confidence (full) | `id, payload` | [Confidence] |
| PATCH | /confidences/{id}/ | partial updates a confidence | `id, payload` | [Confidence] |
| DELETE | /confidences/{id}/ | deletes a confidence | `id` | [void] |
| GET | /confidences/{confidenceId}/comments/ | lists comments for a confidence | `confidenceId` | [ConfidenceComment[]] |
| POST | /confidences/{confidenceId}/comments/ | creates a comment | `confidenceId, payload` | [ConfidenceComment] |
| PUT | /confidences/comments/{id}/ | updates a comment | `id, payload` | [ConfidenceComment] |
| PATCH | /confidences/comments/{id}/ | partial updates a comment | `id, payload` | [ConfidenceComment] |
| DELETE | /confidences/comments/{id}/ | deletes a comment | `id` | [void] |
| POST | /confidences/{id}/like/ | likes a confidence | `id` | [any] |
| DELETE | /confidences/{id}/like/ | unlikes a confidence | `id` | [any] |
| POST | /confidences/comments/{id}/like/ | likes a comment | `id` | [any] |
| DELETE | /confidences/comments/{id}/like/ | unlikes a comment | `id` | [any] |
| GET | /confidences/{id}/generate-stream-url/ | generates a stream URL for a confidence | `id` | `[{ url: string }]` |
| POST | /confidences/{id}/save-stream-url/ | saves a stream URL | `id, payload: { url }` | [any] |



## contactEvents


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /contact-events/ | creates a contact event | `payload: any` | [any] |

| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /contact-events/ | creates a contact event | `payload: any` | [any] |



## contexts


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



## features


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| GET | /features/categories | gets all feature categories |  | [FeatureCategory[]] |
| GET | /features/versions | gets all feature versions |  | [FeatureVersion[]] |
| GET | /features/versions/current | gets current feature version |  | [FeatureVersion | null] |
| GET | /features/flags | gets all feature flags |  | [FeatureFlag[]] |
| GET | /features/flags?categoryId={categoryId} | gets features by category | `categoryId` | [FeatureFlag[]] |
| GET | /features/flags?version={version} | gets features by version | `version` | [FeatureFlag[]] |
| GET | /features/enabled?featureKey={featureKey}&userId={userId} | checks if a feature is enabled for a user | `featureKey, userId` | [boolean] |
| GET | /features/enabled/{userId} | gets enabled features for a user | `userId` | [EnabledFeature[]] |
| POST | /features/usage | tracks feature usage event | `featureKey, userId, eventType, metadata?` | [void] |
| GET | /features/stats?featureKey={featureKey} | gets feature statistics | `featureKey` | [FeatureStats | null] |
| PATCH | /features/flags/{featureId}/status | updates feature enabled status | `featureId, isEnabled` | [void] |
| PATCH | /features/flags/{featureId}/rollout | updates feature rollout percentage | `featureId, rolloutPercentage` | [void] |
| POST | /features/access | grants beta/early access to a user | `featureKey, userId, grantedBy, accessType?, expiresAt?` | [void] |
| DELETE | /features/access?featureKey={featureKey}&userId={userId} | revokes beta access | `featureKey, userId` | [void] |
| GET | /features/access/{userId} | gets user feature access entries | `userId` | [UserFeatureAccess[]] |
| PATCH | /features/flags/{featureId}/schedule | schedules feature enable | `featureId, enableDate` | [void] |
| GET | /features/flags/{featureKey} | gets a feature with details | `featureKey` | [FeatureFlag | null] |
| POST | /features/versions/{versionId}/set-current | sets the current feature version | `versionId` | [void] |



## jobs


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| GET | /job_offers/ | gets published jobs (with optional filters) | `filters?` (contract_type, location, remote_possible, experience_level, job_sector) | [JobOffer[]] |
| GET | /job_offers/?company_id={companyId} | gets jobs for a company | `companyId` | [JobOffer[]] |
| GET | /job_offers/{jobId}/ | gets a job by id | `jobId` | [JobOffer | null] |
| POST | /job_offers/ | creates a job (draft) for a company | `companyId, jobData` | [JobOffer] |
| PUT | /job_offers/{jobId}/ | updates a job (full) | `jobId, updates` | [JobOffer] |
| PUT | /job_offers/{jobId}/ | publishes a job (sets status published) | `jobId` | [JobOffer] |
| PUT | /job_offers/{jobId}/ | closes a job (sets status closed) | `jobId` | [JobOffer] |
| DELETE | /job_offers/{jobId}/ | deletes a job | `jobId` | [void] |
| GET | /job_applications/?athlete_id={athleteId} | gets applications for an athlete | `athleteId` | [JobApplication[]] |
| GET | /job_applications/?job_offer_id={jobId} | gets applications for a job | `jobId` | [JobApplication[]] |
| POST | /job_applications/ | applies to a job (create application) | `athleteId, applicationData` | [JobApplication] |
| PUT | /job_applications/{applicationId}/ | updates application status/data | `applicationId, updates` | [JobApplication] |
| POST | /saved_jobs/ | saves a job for an athlete | `athleteId, jobId` | [SavedJob] |
| DELETE | /saved_jobs/ | unsaves a job (by athlete & job) | `athleteId, jobId` (query params) | [void] |
| GET | /saved_jobs/?athlete_id={athleteId} | lists saved jobs for athlete | `athleteId` | [SavedJob[]] |
| GET | /job_applications/?athlete_id={athleteId}&job_offer_id={jobId} | checks if athlete has applied to job | `athleteId, jobId` | [boolean] |
| GET | /job_offers/ | gets all jobs (admin/filterable) | `params?` | [JobOffer[]] |



## messages


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /messages/ | Send a message from a sender to one or more recipients. | senderId: string, payload: `SendMessageFormData` (e.g. { recipient_id, subject?, body, thread_id? }) | Message — e.g. { id: "...", sender_id: "...", recipient_id: "...", body: "...", created_at: "...", read: false } |
| GET | /messages/?user_id={userId} | Get messages related to a user (both sent and received, depending on backend semantics). | userId: string | Message[] — array of Message objects |
| GET | /messages/?recipient_id={userId} | Get messages received by a user. | userId: string | Message[] |
| GET | /messages/?sender_id={userId} | Get messages sent by a user. | userId: string | Message[] |
| GET | /messages/?recipient_id={userId}&read=false | Get unread messages for a recipient. | userId: string | Message[] |
| GET | /messages/unread_count/?recipient_id={userId} | Get number of unread messages for a recipient. | userId: string | number — e.g. 3 |
| PUT | /messages/{messageId}/ | Mark a message as read (or update other fields). | messageId: string; body example: { read: true, read_at: "<ISO timestamp>" } | Message — updated message object |
| PUT | /messages/mark_multiple_read/ | Mark multiple messages as read. | body: { ids: string[] } | (no content expected) |
| GET | /message_threads/?user_id={userId} | Get message threads for a user (conversations grouped). | userId: string | MessageThread[] — array of thread objects |
| GET | /messages/conversation/?user1={id}&user2={id} | Get conversation messages between two users. | user1Id: string, user2Id: string | Message[] |
| DELETE | /messages/{messageId}/ | Delete a message by id. | messageId: string | (no content expected) |
| GET | /messages/{messageId}/ | Get a single message by id. | messageId: string | Message or null — e.g. { id: "...", sender_id: "...", recipient_id: "...", body: "..." } or null if not found |



## professional


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /professionnel/informations/ | Save company basic information (name, sector). | payload: { nom_structure: string, secteur_activite: string } | created/updated resource info (backend-specific object) |
| POST | /professionnel/localisation/ | Save company location and contact details. | payload: { id_profil: string, taille_structure: string, ville: string, email_contact: string } | created/updated resource info |
| POST | /professionnel/description/ | Save company description for the professional profile. | payload: { id_profil: string, description: string } | created/updated resource info |
| GET | /professionnel/profil/{id}/ | Retrieve a professional/company profile by id. | id: string | Profile object — check `frontend/src/types` for exact shape |



## profiles


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /profiles/ | Create a generic profile. | payload: any (profile fields) | created Profile object |
| POST | /athlete-profiles/ | Create an athlete-specific profile. | payload: any (athlete profile fields) | created AthleteProfile object |
| POST | /company-profiles/ | Create a company-specific profile. | payload: any (company profile fields) | created CompanyProfile object |
| PATCH | /profiles/{profileId}/status | Update a profile's status (e.g., pending/approved). | profileId: string, status: string | updated Profile object |
| DELETE | /profiles/{profileId}/ | Delete a profile by id. | profileId: string | (no content expected) |
| GET | /profiles/?...params | List profiles with optional filters. | params: Record<string, any> | Profile[] — array of profile objects |



## sharedTasks


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /shared_tasks/ | Create a shared task tied to a context (organization, delegation, etc.). | contextType: TaskContextType, contextId: string, createdBy: string, title: string, description: string | SharedTask object |
| GET | /shared_tasks/?context_type={type}&context_id={id}&_expand=assigned_user,creator | Get tasks for a specific context (includes expanded assigned_user and creator). | contextType: TaskContextType, contextId: string | SharedTask[] |
| GET | /shared_tasks/?assigned_to={userId}&status={status} | Get tasks assigned to a user, optionally filtered by status. | userId: string, status?: TaskStatus | SharedTask[] |
| PUT | /shared_tasks/{taskId}/ | Update a task's status or other fields (replaces or updates depending on backend). | taskId: string, updates: Partial<SharedTask> | SharedTask — updated object |
| DELETE | /shared_tasks/{taskId}/ | Delete a task by id. | taskId: string | (no content expected) |
| POST | /task_comments/ | Add a comment to a task. | taskId: string, userId: string, content: string | TaskComment object |
| GET | /task_comments/?task_id={taskId}&_expand=user | Get comments for a task (expanded with user). | taskId: string | TaskComment[] |
| GET | /shared_tasks/?context_type=organization&context_id={organizationId}&status={status} | Get tasks for an organization, optionally filtered by status. | organizationId: string, status?: TaskStatus | SharedTask[] |
| GET | /shared_tasks/?context_type=delegation&context_id={delegationId}&status={status} | Get tasks for a delegation, optionally filtered by status. | delegationId: string, status?: TaskStatus | SharedTask[] |
| GET | /shared_tasks/{taskId}/ | Get a single task by id. | taskId: string | SharedTask or null |



## verification


| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /athlete/verify-email/ | Verify an athlete's email using a verification code. | payload: { verification_code: string } | backend response (success/failure) |
| POST | /athlete/send-code/ | Send a verification code to an email address. | payload: { email: string } | backend response (e.g., { sent: true }) |


