/**
 * Authentication Service
 *
 * ⚠️ POINT D'INTÉGRATION BACKEND CRITIQUE ⚠️
 *
 * Ce service centralise TOUTE la logique métier liée à l'authentification.
 * Il agit comme une couche d'abstraction entre l'UI et le backend (actuellement Supabase).
 *
 * 🔄 POUR MIGRER VERS DJANGO/AUTRE BACKEND :
 *
 * 1. GARDER cette classe (ne pas la supprimer)
 * 2. REMPLACER uniquement les appels `supabase.*` par des appels API REST
 * 3. L'UI continuera de fonctionner sans modification
 *
 * Exemple de migration vers Django :
 * ```typescript
 * // Avant (Supabase)
 * const { data, error } = await supabase.auth.signUp({ email, password });
 *
 * // Après (Django REST)
 * const response = await fetch('/api/auth/register/', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ email, password })
 * });
 * const data = await response.json();
 * ```
 *
 * Avantages de cette architecture :
 * - ✅ Séparation complète UI <-> Backend
 * - ✅ Facilite les tests unitaires (mock du service)
 * - ✅ Changement de backend sans toucher aux composants
 * - ✅ Gestion centralisée des erreurs
 * - ✅ Typage fort TypeScript
 *
 * @see {@link ../lib/supabase.ts} - Client Supabase actuel
 * @see {@link z_README_DJANGO_INTEGRATION.md} - Guide migration Django
 * @module services/authService
 */

import * as authApi from '../api/auth/api-calls'
import type { UserType, Profile, AthleteProfile, CompanyProfile, User } from '../types';

/**
 * Résultat d'une opération d'authentification
 */
interface AuthResult {
  success: boolean;
  error?: string;
  data?: any;
}

/**
 * Service d'authentification
 * Toutes les méthodes sont statiques pour faciliter l'utilisation
 */
export class AuthService {
  /**
   * Inscription d'un nouvel utilisateur
   *
   * @param email - Email de l'utilisateur
   * @param password - Mot de passe
   * @returns Résultat de l'opération
   */
  static async signUp(email: string, password: string): Promise<AuthResult> {
    try {
      const user = await authApi.register({ email, password })
      return { success: true, data: user }
    } catch (error: any) {
      return { success: false, error: error?.message || String(error) }
    }
  }

  /**
   * Connexion d'un utilisateur existant
   *
   * @param email - Email de l'utilisateur
   * @param password - Mot de passe
   * @returns Résultat de l'opération
   */
  static async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      const tokens = await authApi.login({ email, password })
      return { success: true, data: tokens }
    } catch (error: any) {
      return { success: false, error: error?.message || String(error) }
    }
  }

  /**
   * Déconnexion de l'utilisateur courant
   *
   * @returns Résultat de l'opération
   */
  static async signOut(): Promise<AuthResult> {
    try {
      // Token/session clearing is handled by the auth provider. If backend logout is required,
      // call an endpoint here. For now, return success.
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message || String(error) };
    }
  }

  /**
   * Réinitialisation du mot de passe
   *
   * @param email - Email de l'utilisateur
   * @returns Résultat de l'opération
   */
  static async resetPassword(email: string): Promise<AuthResult> {
    try {
      await authApi.forgotPassword({ email })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error?.message || String(error) }
    }
  }

  /**
   * Récupération de l'utilisateur connecté
   *
   * @returns Utilisateur connecté ou null
   */
  static async getCurrentUser() {
    try {
      const me = await authApi.me()
      return me as User | null
    } catch (error) {
      console.error('Erreur lors de la recuperation de l\'utilisateur:', error);
      return null
    }
  }

  /**
   * Récupération du profil complet d'un utilisateur
   *
   * @param userId - ID de l'utilisateur
   * @returns Profil de l'utilisateur ou null
   */
  static async getUserProfile(userId: string): Promise<Profile | null> {
    try {
      // If the requested profile is the current user, reuse me()
      const me = await authApi.me()
      if (me && (me as any).id === userId) return me as any as Profile
  // no profiles.getByUserId endpoint available in api-calls; return null if not current user
  return null
    } catch (error) {
      console.error('Erreur lors de la recuperation du profil:', error);
      return null;
    }
  }

  /**
   * Création d'un profil utilisateur
   *
   * @param userId - ID de l'utilisateur
   * @param email - Email de l'utilisateur
   * @param userType - Type d'utilisateur (athlete, company, admin)
   * @returns Résultat de l'opération
   */
  static async createProfile(
    userId: string,
    email: string,
    userType: UserType
  ): Promise<AuthResult> {
    try {
      const profilesApi = await import('../api/profiles/api-calls')
      await profilesApi.createProfile({ id: userId, email, user_type: userType })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error?.message || String(error) }
    }
  }

  /**
   * Création d'un profil athlète détaillé
   *
   * @param userId - ID de l'utilisateur
   * @param profileData - Données du profil athlète
   * @returns Résultat de l'opération
   */
  static async createAthleteProfile(
    userId: string,
    profileData: Partial<AthleteProfile>
  ): Promise<AuthResult> {
    try {
      const profilesApi = await import('../api/profiles/api-calls')
      await profilesApi.createAthleteProfile({ user_id: userId, ...profileData })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error?.message || String(error) }
    }
  }

  /**
   * Création d'un profil entreprise détaillé
   *
   * @param userId - ID de l'utilisateur
   * @param profileData - Données du profil entreprise
   * @returns Résultat de l'opération
   */
  static async createCompanyProfile(
    userId: string,
    profileData: Partial<CompanyProfile>
  ): Promise<AuthResult> {
    try {
      const profilesApi = await import('../api/profiles/api-calls')
      await profilesApi.createCompanyProfile({ user_id: userId, ...profileData })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error?.message || String(error) }
    }
  }
}
