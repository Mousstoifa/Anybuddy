import * as api from '../api/jobs/api-calls'
import type {
  JobOffer,
  JobApplication,
  SavedJob,
  JobOfferFormData,
  JobApplicationFormData,
  JobSearchFilters,
} from '../types/jobs';

export class JobService {
  /**
   * Récupère toutes les offres publiées (pour athlètes)
   */
  static async getPublishedJobs(filters?: JobSearchFilters): Promise<JobOffer[]> {
    return await api.getPublishedJobs(filters)
  }

  /**
   * Récupère les offres d'une entreprise
   */
  static async getCompanyJobs(companyId: string): Promise<JobOffer[]> {
    return await api.getCompanyJobs(companyId)
  }

  /**
   * Récupère une offre par ID
   */
  static async getJobById(jobId: string): Promise<JobOffer | null> {
    return await api.getJobById(jobId)
  }

  /**
   * Crée une nouvelle offre d'emploi (entreprise uniquement)
   */
  static async createJob(
    companyId: string,
    jobData: JobOfferFormData
  ): Promise<JobOffer> {
    return await api.createJob(companyId, jobData)
  }

  /**
   * Met à jour une offre d'emploi
   */
  static async updateJob(
    jobId: string,
    updates: Partial<JobOfferFormData>
  ): Promise<JobOffer> {
    return await api.updateJob(jobId, updates)
  }

  /**
   * Publie une offre (change status à 'published')
   */
  static async publishJob(jobId: string): Promise<JobOffer> {
    return await api.publishJob(jobId)
  }

  /**
   * Ferme une offre (change status à 'closed')
   */
  static async closeJob(jobId: string): Promise<JobOffer> {
    return await api.closeJob(jobId)
  }

  /**
   * Supprime une offre
   */
  static async deleteJob(jobId: string): Promise<void> {
    return await api.deleteJob(jobId)
  }

  /**
   * Récupère les candidatures d'un athlète
   */
  static async getAthleteApplications(athleteId: string): Promise<JobApplication[]> {
    return await api.getAthleteApplications(athleteId)
  }

  /**
   * Récupère les candidatures pour une offre (entreprise uniquement)
   */
  static async getJobApplications(jobId: string): Promise<JobApplication[]> {
    return await api.getJobApplications(jobId)
  }

  /**
   * Crée une candidature
   */
  static async applyToJob(
    athleteId: string,
    applicationData: JobApplicationFormData
  ): Promise<JobApplication> {
    return await api.applyToJob(athleteId, applicationData)
  }

  /**
   * Met à jour le statut d'une candidature (entreprise uniquement)
   */
  static async updateApplicationStatus(
    applicationId: string,
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  ): Promise<JobApplication> {
    const updates: any = { status };

    if (status !== 'pending') {
      updates.reviewed_at = new Date().toISOString();
    }

    return await api.updateApplicationStatus(applicationId, updates)
  }

  /**
   * Sauvegarde une offre (athlète uniquement)
   */
  static async saveJob(athleteId: string, jobId: string): Promise<SavedJob> {
    return await api.saveJob(athleteId, jobId)
  }

  /**
   * Supprime une offre sauvegardée
   */
  static async unsaveJob(athleteId: string, jobId: string): Promise<void> {
    return await api.unsaveJob(athleteId, jobId)
  }

  /**
   * Récupère les offres sauvegardées d'un athlète
   */
  static async getSavedJobs(athleteId: string): Promise<SavedJob[]> {
    return await api.getSavedJobs(athleteId)
  }

  /**
   * Vérifie si un athlète a déjà postulé à une offre
   */
  static async hasApplied(athleteId: string, jobId: string): Promise<boolean> {
    return await api.hasApplied(athleteId, jobId)
  }

  /**
   * Vérifie si un athlète a sauvegardé une offre
   */
  static async isSaved(athleteId: string, jobId: string): Promise<boolean> {
    return !!(await api.hasApplied(athleteId, jobId))
  }
}
