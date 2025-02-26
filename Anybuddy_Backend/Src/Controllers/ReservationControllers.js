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
      "idDisponibilite",
      disponibilite (
        "idDisponibilite",
        datedebut,
        datefin,
        idterrain
      )
    `);
  
  
  console.log(data, error);
  

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getReservationsByTerrain = async (req, res) => {
  const { idTerrain } = req.params; // Récupère l'ID du terrain depuis l'URL

  try {
    const { data, error } = await supabase
  .from("reservation")
  .select(`
    idreservation,
    horaire,
    duree,
    prix,
    idDisponibilite,
    disponibilite (
      idDisponibilite,
      datedebut,
      datefin,
      idterrain
    )
  `)
    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error("🚨 Erreur API :", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Créer une nouvelle réservation
export const createReservation = async (req, res) => {
  const { horaire, duree, prix, idDisponibilite, joueurs } = req.body;

  try {
    if (!horaire || !duree || !prix || !idDisponibilite || !joueurs || joueurs.length === 0) {
      return res.status(400).json({ error: 'Tous les champs sont requis et au moins un joueur.' });
    }

    // ✅ Étape 1: Créer la réservation et récupérer son ID
    const { data: reservation, error: reservationError } = await supabase
      .from('reservation')
      .insert([{ horaire, duree, prix, idDisponibilite }])
      .select(); // Récupérer l'ID inséré

    if (reservationError) throw reservationError;

    const reservationId = reservation[0].idreservation;

    // ✅ Étape 2: Insérer plusieurs joueurs avec cet ID de réservation
    const joueursInsert = joueurs.map((idutilisateur) => ({
      idutilisateur,
      idreservation: reservationId, // Utilisation de l'ID fraîchement inséré
    }));

    const { error: reserverError } = await supabase
      .from('reserver')
      .insert(joueursInsert);

    if (reserverError) throw reserverError;

    res.status(201).json({
      message: 'Réservation créée avec succès pour plusieurs joueurs.',
      reservation: reservation[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Modifier une réservation existante
export const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { horaire, duree, prix, idDisponibilite } = req.body;

  try {
    const { data, error } = await supabase
      .from('reservation')
      .update({ horaire, duree, prix, idDisponibilite })
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