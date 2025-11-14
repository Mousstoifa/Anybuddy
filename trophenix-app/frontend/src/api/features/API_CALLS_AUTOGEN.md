# Auto-generated API Calls

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
