import { supabase } from '../Config/Supabase.js';

// Récupérer tous les paiements avec les informations associées
export const getPaiements = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Paiement')
      .select(`
        IdPaiement,
        Montant,
        Mode_Paiement,
        DatePaiement,
        Reservation (
          IdReservation,
          Horaire,
          Duree,
          Prix
        )
      `);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un nouveau paiement
export const createPaiement = async (req, res) => {
  const { IdReservation, Montant, Mode_Paiement, DatePaiement } = req.body;

  try {
    if (!IdReservation || !Montant || !Mode_Paiement || !DatePaiement) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const { data, error } = await supabase
      .from('Paiement')
      .insert([{ IdReservation, Montant, Mode_Paiement, DatePaiement }]);

    if (error) throw error;

    res.status(201).json({ message: 'Paiement créé avec succès.', paiement: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un paiement existant
export const updatePaiement = async (req, res) => {
  const { id } = req.params;
  const { Montant, Mode_Paiement, DatePaiement } = req.body;

  try {
    const updates = {};
    if (Montant !== undefined) updates.Montant = Montant;
    if (Mode_Paiement !== undefined) updates.Mode_Paiement = Mode_Paiement;
    if (DatePaiement !== undefined) updates.DatePaiement = DatePaiement;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Aucune donnée fournie pour la mise à jour.' });
    }

    const { data, error } = await supabase
      .from('Paiement')
      .update(updates)
      .eq('IdPaiement', id);

    if (error) throw error;

    res.status(200).json({ message: 'Paiement mis à jour avec succès.', paiement: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un paiement
export const deletePaiement = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('Paiement')
      .delete()
      .eq('IdPaiement', id);

    if (error) throw error;

    res.status(200).json({ message: 'Paiement supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
