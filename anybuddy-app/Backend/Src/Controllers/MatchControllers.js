import { supabase } from '../Config/Supabase.js';

// Récupérer tous les matchs avec les informations associées
export const getMatchs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Matchs')
      .select(`
        IdMatch,
        DateMatch,
        NomMatch,
        Terrain (
          IdTerrain,
          Nom_Equipe,
          Couleur_Equipe
        )
      `);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un nouveau match
export const createMatch = async (req, res) => {
  const { DateMatch, NomMatch, IdTerrain } = req.body;

  try {
    if (!DateMatch || !NomMatch || !IdTerrain) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const { data, error } = await supabase
      .from('Matchs')
      .insert([{ DateMatch, NomMatch, IdTerrain }]);

    if (error) throw error;

    res.status(201).json({ message: 'Match créé avec succès.', match: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un match existant
export const updateMatch = async (req, res) => {
  const { id } = req.params;
  const { DateMatch, NomMatch, IdTerrain } = req.body;

  try {
    const { data, error } = await supabase
      .from('Matchs')
      .update({ DateMatch, NomMatch, IdTerrain })
      .eq('IdMatch', id);

    if (error) throw error;

    res.status(200).json({ message: 'Match mis à jour avec succès.', match: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un match
export const deleteMatch = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('Matchs')
      .delete()
      .eq('IdMatch', id);

    if (error) throw error;

    res.status(200).json({ message: 'Match supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
