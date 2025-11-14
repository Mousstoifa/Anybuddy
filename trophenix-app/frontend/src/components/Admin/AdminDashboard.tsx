import { useState, useEffect } from 'react';
// supabase usage removed; use API wrappers instead
import * as adminApi from '../../api/admin/api-calls';
import * as profilesApi from '../../api/profiles/api-calls';
import { Profile, AthleteProfile, CompanyProfile } from '../../types';
import {
  CheckCircle, XCircle, Trophy, Briefcase, LogOut, Users,
  FileText, MessageSquare, Monitor, UserCheck, Building2, Shield
} from 'lucide-react';
import { useAuth } from '../../AuthProvider';
import AdminTeamManagement from './AdminTeamManagement';
import AdminUsersManagement from './AdminUsersManagement';
import AdminJobsManagement from './AdminJobsManagement';

interface PendingProfile {
  profile: Profile;
  athleteProfile?: AthleteProfile;
  companyProfile?: CompanyProfile;
}

type AdminView = 'stats' | 'pending' | 'team' | 'users' | 'jobs' | 'messages';

interface Stats {
  totalUsers: number;
  totalAthletes: number;
  totalCompanies: number;
  pendingValidation: number;
  totalJobs: number;
  totalApplications: number;
  totalMessages: number;
}

export function AdminDashboard() {
  const { signOut } = useAuth();
  const [pending, setPending] = useState<PendingProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<AdminView>('stats');
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalAthletes: 0,
    totalCompanies: 0,
    pendingValidation: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalMessages: 0,
  });

  useEffect(() => {
    fetchStats();
    fetchPendingProfiles();
  }, []);

  const fetchStats = async () => {
    try {
      const counts = await adminApi.getCounts();
      setStats({
        totalUsers: counts.users || 0,
        totalAthletes: counts.athletes || 0,
        totalCompanies: counts.companies || 0,
        pendingValidation: counts.pending || 0,
        totalJobs: counts.jobs || 0,
        totalApplications: counts.applications || 0,
        totalMessages: counts.messages || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchPendingProfiles = async () => {
    setLoading(true);

    try {
      const profiles = await adminApi.getPendingProfiles();
      setPending(profiles || []);
    } catch (err) {
      console.error('Error fetching profiles:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingProfiles();
  }, []);

  const handleValidation = async (profileId: string, status: 'approved' | 'rejected') => {
    setActionLoading(profileId);

    try {
      await profilesApi.updateProfileStatus(profileId, status);
      await fetchPendingProfiles();
      await fetchStats();
    } catch (err) {
      console.error('Error updating profile status', err);
    }

    setActionLoading(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-900">Trophenix Admin</span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="/super-admin"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/super-admin';
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Monitor className="h-5 w-5" />
                <span>Console Super Admin</span>
              </a>
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Tableau de Bord Admin</h1>
          <p className="text-slate-600">Gérez la plateforme Trophenix</p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setCurrentView('stats')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap ${
              currentView === 'stats'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Statistiques
          </button>
          <button
            onClick={() => setCurrentView('pending')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap ${
              currentView === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Validations ({stats.pendingValidation})
          </button>
          <button
            onClick={() => setCurrentView('team')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap ${
              currentView === 'team'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Shield className="inline h-5 w-5 mr-2" />
            Équipe Admin
          </button>
          <button
            onClick={() => setCurrentView('users')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap ${
              currentView === 'users'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Utilisateurs
          </button>
          <button
            onClick={() => setCurrentView('jobs')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap ${
              currentView === 'jobs'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Offres d'emploi
          </button>
        </div>

        {currentView === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-700">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stats.totalUsers}</p>
                <p className="text-sm text-slate-600">Utilisateurs</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-green-100 text-green-700">
                    <Trophy className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stats.totalAthletes}</p>
                <p className="text-sm text-slate-600">Athlètes</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-purple-100 text-purple-700">
                    <Building2 className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stats.totalCompanies}</p>
                <p className="text-sm text-slate-600">Entreprises</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-yellow-100 text-yellow-700">
                    <UserCheck className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stats.pendingValidation}</p>
                <p className="text-sm text-slate-600">En attente</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-indigo-100 text-indigo-700">
                    <Briefcase className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stats.totalJobs}</p>
                <p className="text-sm text-slate-600">Offres d'emploi</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-pink-100 text-pink-700">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stats.totalApplications}</p>
                <p className="text-sm text-slate-600">Candidatures</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-cyan-100 text-cyan-700">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stats.totalMessages}</p>
                <p className="text-sm text-slate-600">Messages</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'pending' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profils en attente de validation</h2>

            {pending.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <UserCheck className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <p className="text-slate-600 text-lg">Aucun profil en attente de validation</p>
              </div>
            ) : (
              <div className="space-y-6">
            {pending.map(({ profile, athleteProfile, companyProfile }) => (
              <div key={profile.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {profile.user_type === 'athlete' ? (
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <Trophy className="h-6 w-6 text-slate-700" />
                      </div>
                    ) : (
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <Briefcase className="h-6 w-6 text-slate-700" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {athleteProfile
                          ? `${athleteProfile.first_name} ${athleteProfile.last_name}`
                          : companyProfile?.company_name}
                      </h3>
                      <p className="text-sm text-slate-600">{profile.email}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    {profile.user_type === 'athlete' ? 'Sportif' : 'Entreprise'}
                  </span>
                </div>

                {athleteProfile && (
                  <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-slate-600">Sport:</span>{' '}
                      <span className="text-slate-900 font-medium">{athleteProfile.sport}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Niveau:</span>{' '}
                      <span className="text-slate-900 font-medium">{athleteProfile.sport_level}</span>
                    </div>
                    {athleteProfile.geographic_zone && (
                      <div>
                        <span className="text-slate-600">Localisation:</span>{' '}
                        <span className="text-slate-900 font-medium">{athleteProfile.geographic_zone}</span>
                      </div>
                    )}
                    {athleteProfile.desired_field && (
                      <div>
                        <span className="text-slate-600">Domaine souhaité:</span>{' '}
                        <span className="text-slate-900 font-medium">{athleteProfile.desired_field}</span>
                      </div>
                    )}
                  </div>
                )}

                {companyProfile && (
                  <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-slate-600">Secteur:</span>{' '}
                      <span className="text-slate-900 font-medium">{companyProfile.sector}</span>
                    </div>
                    {companyProfile.company_size && (
                      <div>
                        <span className="text-slate-600">Taille:</span>{' '}
                        <span className="text-slate-900 font-medium">{companyProfile.company_size}</span>
                      </div>
                    )}
                    {companyProfile.location && (
                      <div>
                        <span className="text-slate-600">Localisation:</span>{' '}
                        <span className="text-slate-900 font-medium">{companyProfile.location}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleValidation(profile.id, 'approved')}
                    disabled={actionLoading === profile.id}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Approuver</span>
                  </button>
                  <button
                    onClick={() => handleValidation(profile.id, 'rejected')}
                    disabled={actionLoading === profile.id}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle className="h-5 w-5" />
                    <span>Rejeter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
            )}
          </div>
        )}

        {currentView === 'team' && <AdminTeamManagement />}

        {currentView === 'users' && <AdminUsersManagement />}

        {currentView === 'jobs' && <AdminJobsManagement />}

        {currentView === 'messages' && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <MessageSquare className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Surveillance des Messages</h3>
            <p className="text-gray-600 mb-4">
              Cette fonctionnalité permettra de surveiller et modérer les messages
            </p>
            <p className="text-sm text-gray-500">À venir prochainement</p>
          </div>
        )}
      </div>

  {/* AgentElea intentionally disabled for this build */}
    </div>
  );
}
