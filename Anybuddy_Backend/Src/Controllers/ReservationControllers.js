import { supabase } from '../Config/Supabase.js';

// Get all réservations 
export const getReservations = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reservation')
      .select(`
        idreservation,
        horaire,
        duree,
        prix,
        disponibilite (
          iddisponibilite,
          datedebut,
          datefin,
          terrain (
            idterrain,
            nom_equipe,
            couleur_equipe
          )
        ),
        reserver (
          idutilisateur,
          users (
            nom,
            prenom,
            email
          )
        )
      `);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une nouvelle réservation
export const createReservation = async (req, res) => {
  const { horaire, duree, prix, iddisponibilite, idutilisateur } = req.body;

  try {
    if (!horaire || !duree || !prix || !iddisponibilite || !idutilisateur) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const { data: reservation, error } = await supabase
      .from('reservation')
      .insert([{ horaire, duree, prix, iddisponibilite }]);

    if (error) throw error;

    // Associer la réservation à un utilisateur dans la table "reserver"
    const { data: reserver, error: reserverError } = await supabase
      .from('reserver')
      .insert([{ idutilisateur, idreservation: reservation[0].idreservation }]);

    if (reserverError) throw reserverError;

    res.status(201).json({
      message: 'Réservation créée avec succès.',
      reservation: reservation[0],
      reserver,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier une réservation existante
export const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { horaire, duree, prix, iddisponibilite } = req.body;

  try {
    const { data, error } = await supabase
      .from('reservation')
      .update({ horaire, duree, prix, iddisponibilite })
      .eq('idreservation', id);

    if (error) throw error;

    res.status(200).json({ message: 'Réservation mise à jour avec succès.', reservation: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une réservation
export const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('reservation')
      .delete()
      .eq('idreservation', id);

    if (error) throw error;

    res.status(200).json({ message: 'Réservation supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
