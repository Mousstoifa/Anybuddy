import { useState, useEffect } from 'react';
import { useGetAthleteById } from '../../api/athletes/hooks';
import { useCreateContactEvent } from '../../api/contactEvents/hooks';
import { AthleteProfile, Profile } from '../../types';
import type { User as AuthUser } from '../../types';
import {
  ArrowLeft,
  Trophy,
  MapPin,
  Briefcase,
  Calendar,
  GraduationCap,
  Award,
  Mail,
  User,
  Volume2
} from 'lucide-react';
interface AthleteDetailProps {
  athleteId: string;
  onBack: () => void;
  /** Authenticated user (passed from parent) */
  user?: AuthUser | null;
  /** Authenticated profile (passed from parent) */
  profile?: Profile | null;
}

export function AthleteDetail({ athleteId, onBack, user, profile }: AthleteDetailProps) {
  const [athlete, setAthlete] = useState<AthleteProfile | null>(null);
  const [athleteProfile, setAthleteProfile] = useState<Profile | null>(null);
  const getAthleteById = useGetAthleteById()
  const createContactEvent = useCreateContactEvent()
  const [loading, setLoading] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        // call the hook with the id parameter
        const data = await getAthleteById.call(Number(athleteId))
        if (data) {
          // API returns Athlete; component expects AthleteProfile — cast safely when fields match
          setAthlete(data as unknown as AthleteProfile)
          // assume backend returns embedded profile or separate field
          if ((data as any).profile) setAthleteProfile((data as any).profile)
        }
      } catch (err) {
        console.error('Error fetching athlete:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [athleteId])

  const handleContact = async () => {
    if (!user || !profile || !athlete) return;

    setContactLoading(true);

    try {
      await createContactEvent({
        athlete_id: athlete.id,
        contactor_id: user.id,
        contactor_type: profile.user_type as 'athlete' | 'company'
      });
      setShowEmail(true);
    } catch (err) {
      // ignore - keep existing behavior
    }

    setContactLoading(false);
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

  if (!athlete || !athleteProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Profil non trouvé</p>
          <button onClick={onBack} className="mt-4 text-slate-900 hover:underline">
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour à la liste
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-64 bg-gradient-to-r from-slate-700 to-slate-900">
            {athlete.photo_url ? (
              <img
                src={athlete.photo_url}
                alt={`${athlete.first_name} ${athlete.last_name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <User className="h-32 w-32 text-white opacity-50" />
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {athlete.first_name} {athlete.last_name}
                </h1>
                <div className="flex items-center text-lg text-slate-600">
                  <Trophy className="h-5 w-5 mr-2" />
                  <span>
                    {athlete.sport} - {athlete.sport_level}
                  </span>
                </div>
              </div>

              {!showEmail ? (
                <button
                  onClick={handleContact}
                  disabled={contactLoading}
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactLoading ? 'Chargement...' : 'Contacter'}
                </button>
              ) : (
                <div className="bg-slate-100 px-6 py-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">{athleteProfile.email}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {athlete.geographic_zone && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">Localisation</p>
                    <p className="text-slate-900 font-medium">{athlete.geographic_zone}</p>
                  </div>
                </div>
              )}

              {athlete.desired_field && (
                <div className="flex items-start space-x-3">
                  <Briefcase className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">Domaine souhaité</p>
                    <p className="text-slate-900 font-medium">{athlete.desired_field}</p>
                  </div>
                </div>
              )}

              {athlete.position_type && (
                <div className="flex items-start space-x-3">
                  <Briefcase className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">Type de poste</p>
                    <p className="text-slate-900 font-medium">{athlete.position_type}</p>
                  </div>
                </div>
              )}

              {athlete.availability && (
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">Disponibilité</p>
                    <p className="text-slate-900 font-medium">{athlete.availability}</p>
                  </div>
                </div>
              )}
            </div>

            {athlete.achievements && (
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="h-5 w-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Palmarès et réussites</h2>
                </div>
                <p className="text-slate-700 whitespace-pre-line">{athlete.achievements}</p>
              </div>
            )}

            {athlete.professional_history && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  Historique professionnel
                </h2>
                <p className="text-slate-700 whitespace-pre-line">{athlete.professional_history}</p>
              </div>
            )}

            {athlete.degrees && (
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Diplômes et formations</h2>
                </div>
                <p className="text-slate-700 whitespace-pre-line">{athlete.degrees}</p>
              </div>
            )}

            {athlete.recommendations && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Recommandations</h2>
                <p className="text-slate-700 whitespace-pre-line">{athlete.recommendations}</p>
              </div>
            )}

            {athlete.voice_note_url && (
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <Volume2 className="h-5 w-5 text-slate-700" />
                  <h2 className="text-xl font-semibold text-slate-900">Note vocale de motivation</h2>
                </div>
                <audio controls className="w-full">
                  <source src={athlete.voice_note_url} />
                  Votre navigateur ne supporte pas la lecture audio.
                </audio>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
