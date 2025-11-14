import * as api from '../api/features/api-calls';
import type {
  FeatureCategory,
  FeatureVersion,
  FeatureFlag,
  EnabledFeature,
  FeatureStats,
  UserFeatureAccess,
  FeatureKey
} from '../types/features';

/**
 * FeatureFlagsService - Core service for feature flag management
 *
 * Responsibilities:
 * - Manage feature flags, categories, and versions
 * - Control feature rollout (0-100%) and beta testing
 * - Track feature usage analytics
 * - Cache enabled features per user (5min TTL)
 *
 * Architecture decisions:
 * - Singleton pattern for shared cache across app
 * - Per-user cache to minimize DB queries
 * - SQL functions in DB for complex logic (performance)
 *
 * Performance notes:
 * - Cache reduces DB load significantly (5min TTL)
 * - isFeatureEnabled() returns false on error (fail-safe)
 * - trackFeatureUsage() is fire-and-forget (non-blocking)
 *
 * Migration notes:
 * - When migrating to custom backend, replace supabase.rpc() with API calls
 * - Keep cache logic intact (backend-agnostic)
 *
 * @singleton
 */
class FeatureFlagsService {
  private enabledFeaturesCache: Map<string, EnabledFeature[]> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes - balance between freshness and performance

  async getAllCategories(): Promise<FeatureCategory[]> {
    return api.getAllCategories();
  }

  async getAllVersions(): Promise<FeatureVersion[]> {
    return api.getAllVersions();
  }

  async getCurrentVersion(): Promise<FeatureVersion | null> {
    return api.getCurrentVersion();
  }

  async getAllFeatures(): Promise<FeatureFlag[]> {
    return api.getAllFeatures();
  }

  async getFeaturesByCategory(categoryId: string): Promise<FeatureFlag[]> {
    return api.getFeaturesByCategory(categoryId);
  }

  async getFeaturesByVersion(version: string): Promise<FeatureFlag[]> {
    return api.getFeaturesByVersion(version);
  }

  /**
   * Check if a feature is enabled for a specific user
   *
   * Handles:
   * - Global enable/disable flag
   * - Rollout percentage (deterministic hash-based)
   * - Beta access grants
   * - Explicit blocks
   *
   * @returns false on error (fail-safe: hide features if unsure)
   */
  async isFeatureEnabled(featureKey: FeatureKey, userId: string): Promise<boolean> {
    try {
      return await api.isFeatureEnabled(featureKey, userId);
    } catch (err) {
      console.error('Error checking feature status:', err);
      return false;
    }
  }

  /**
   * Get all enabled features for a user (with cache)
   *
   * Cache strategy:
   * - Per-user in-memory cache (5min TTL)
   * - Reduces DB load from O(n_requests) to O(1) per 5min
   * - Use forceRefresh after admin changes
   *
   * Performance impact:
   * - Typical app: 1 DB query per user per 5min instead of per page load
   * - 10k active users: 2k queries/min → 33 queries/min (60x reduction)
   *
   * @param forceRefresh - Bypass cache (use after feature flag changes)
   */
  async getEnabledFeaturesForUser(userId: string, forceRefresh = false): Promise<EnabledFeature[]> {
    const now = Date.now();
    const cachedExpiry = this.cacheExpiry.get(userId);

    if (!forceRefresh && cachedExpiry && now < cachedExpiry) {
      const cached = this.enabledFeaturesCache.get(userId);
      if (cached) {
        return cached;
      }
    }

    const features = await api.getEnabledFeaturesForUser(userId);
    this.enabledFeaturesCache.set(userId, features);
    this.cacheExpiry.set(userId, now + this.CACHE_DURATION);

    return features;
  }

  /**
   * Track feature usage for analytics (fire-and-forget)
   *
   * Note: Errors are silently ignored to not block user experience
   * Use for: click events, feature access, engagement metrics
   *
   * @example trackFeatureUsage('elea_ai', userId, 'message_sent', { length: 150 })
   */
  async trackFeatureUsage(
    featureKey: FeatureKey,
    userId: string,
    eventType: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    // Fire-and-forget to backend
    try {
      await api.trackFeatureUsage(featureKey, userId, eventType, metadata);
    } catch (err) {
      // ignore errors to avoid blocking UX
      // backend will be authoritative on feature existence
    }
  }

  async getFeatureStats(featureKey: FeatureKey): Promise<FeatureStats | null> {
    try {
      return await api.getFeatureStats(featureKey);
    } catch (err) {
      console.error('Error fetching feature stats:', err);
      return null;
    }
  }

  async updateFeatureStatus(featureId: string, isEnabled: boolean): Promise<void> {
    await api.updateFeatureStatus(featureId, isEnabled);
    this.clearCache();
  }

  async updateFeatureRollout(featureId: string, rolloutPercentage: number): Promise<void> {
    await api.updateFeatureRollout(featureId, rolloutPercentage);
    this.clearCache();
  }

  async grantBetaAccess(
    featureKey: FeatureKey,
    userId: string,
    grantedBy: string,
    accessType: 'beta' | 'early_access' | 'preview' = 'beta',
    expiresAt?: string
  ): Promise<void> {
    await api.grantBetaAccess(featureKey, userId, grantedBy, accessType, expiresAt);
    this.clearCacheForUser(userId);
  }

  async revokeBetaAccess(featureKey: FeatureKey, userId: string): Promise<void> {
    await api.revokeBetaAccess(featureKey, userId);
    this.clearCacheForUser(userId);
  }

  async getUserBetaAccess(userId: string): Promise<UserFeatureAccess[]> {
    return api.getUserBetaAccess(userId);
  }

  clearCache(): void {
    this.enabledFeaturesCache.clear();
    this.cacheExpiry.clear();
  }

  clearCacheForUser(userId: string): void {
    this.enabledFeaturesCache.delete(userId);
    this.cacheExpiry.delete(userId);
  }

  async scheduleFeatureEnable(
    featureId: string,
    enableDate: string
  ): Promise<void> {
    await api.scheduleFeatureEnable(featureId, enableDate);
  }

  async getFeatureWithDetails(featureKey: FeatureKey): Promise<FeatureFlag | null> {
    return api.getFeatureWithDetails(featureKey);
  }

  async setCurrentVersion(versionId: string): Promise<void> {
    await api.setCurrentVersion(versionId);
    this.clearCache();
  }
}

export const FeatureService = new FeatureFlagsService();
