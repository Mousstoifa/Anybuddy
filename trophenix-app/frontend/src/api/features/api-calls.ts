import axios from '../axios';
import type {
  FeatureCategory,
  FeatureVersion,
  FeatureFlag,
  EnabledFeature,
  FeatureStats,
  UserFeatureAccess,
  FeatureKey
} from '../../types/features';

const BASE = '/features';

export async function getAllCategories(): Promise<FeatureCategory[]> {
  const res = await axios.get(`${BASE}/categories`);
  return res.data || [];
}

export async function getAllVersions(): Promise<FeatureVersion[]> {
  const res = await axios.get(`${BASE}/versions`);
  return res.data || [];
}

export async function getCurrentVersion(): Promise<FeatureVersion | null> {
  const res = await axios.get(`${BASE}/versions/current`);
  return res.data || null;
}

export async function getAllFeatures(): Promise<FeatureFlag[]> {
  const res = await axios.get(`${BASE}/flags`);
  return res.data || [];
}

export async function getFeaturesByCategory(categoryId: string): Promise<FeatureFlag[]> {
  const res = await axios.get(`${BASE}/flags`, { params: { categoryId } });
  return res.data || [];
}

export async function getFeaturesByVersion(version: string): Promise<FeatureFlag[]> {
  const res = await axios.get(`${BASE}/flags`, { params: { version } });
  return res.data || [];
}

export async function isFeatureEnabled(featureKey: FeatureKey, userId: string): Promise<boolean> {
  const res = await axios.get(`${BASE}/enabled`, { params: { featureKey, userId } });
  return res.data === true;
}

export async function getEnabledFeaturesForUser(userId: string): Promise<EnabledFeature[]> {
  const res = await axios.get(`${BASE}/enabled/${userId}`);
  return res.data || [];
}

export async function trackFeatureUsage(
  featureKey: FeatureKey,
  userId: string,
  eventType: string,
  metadata: Record<string, any> = {}
): Promise<void> {
  await axios.post(`${BASE}/usage`, { featureKey, userId, eventType, metadata });
}

export async function getFeatureStats(featureKey: FeatureKey): Promise<FeatureStats | null> {
  const res = await axios.get(`${BASE}/stats`, { params: { featureKey } });
  return res.data || null;
}

export async function updateFeatureStatus(featureId: string, isEnabled: boolean): Promise<void> {
  await axios.patch(`${BASE}/flags/${featureId}/status`, { isEnabled });
}

export async function updateFeatureRollout(featureId: string, rolloutPercentage: number): Promise<void> {
  await axios.patch(`${BASE}/flags/${featureId}/rollout`, { rolloutPercentage });
}

export async function grantBetaAccess(
  featureKey: FeatureKey,
  userId: string,
  grantedBy: string,
  accessType: 'beta' | 'early_access' | 'preview' = 'beta',
  expiresAt?: string
): Promise<void> {
  await axios.post(`${BASE}/access`, { featureKey, userId, grantedBy, accessType, expiresAt });
}

export async function revokeBetaAccess(featureKey: FeatureKey, userId: string): Promise<void> {
  await axios.delete(`${BASE}/access`, { params: { featureKey, userId } });
}

export async function getUserBetaAccess(userId: string): Promise<UserFeatureAccess[]> {
  const res = await axios.get(`${BASE}/access/${userId}`);
  return res.data || [];
}

export async function scheduleFeatureEnable(featureId: string, enableDate: string): Promise<void> {
  await axios.patch(`${BASE}/flags/${featureId}/schedule`, { enableDate });
}

export async function getFeatureWithDetails(featureKey: FeatureKey): Promise<FeatureFlag | null> {
  const res = await axios.get(`${BASE}/flags/${featureKey}`);
  return res.data || null;
}

export async function setCurrentVersion(versionId: string): Promise<void> {
  await axios.post(`${BASE}/versions/${versionId}/set-current`);
}
