import { supabase } from '../Config/Supabase.js';

// Récupérer tous les scores avec les matchs et équipes associés
export const getScores = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Scores')
      .select(`
        IdMatch,
        IdEquipe,
        Points,
        Matchs (
          NomMatch,
          DateMatch
        ),
        Equipe (
          NomEquipe
        )
      `);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un score pour un match et une équipe
export const createScore = async (req, res) => {
  const { IdMatch, IdEquipe, Points } = req.body;

  try {
    if (!IdMatch || !IdEquipe || Points === undefined) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const { data, error } = await supabase
      .from('Scores')
      .insert([{ IdMatch, IdEquipe, Points }]);

    if (error) throw error;

    res.status(201).json({ message: 'Score ajouté avec succès.', score: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un score existant
export const updateScore = async (req, res) => {
  const { id } = req.params;
  const { Points } = req.body;

  try {
    if (Points === undefined) {
      return res.status(400).json({ error: 'Les points sont requis.' });
    }

    const { data, error } = await supabase
      .from('Scores')
      .update({ Points })
      .eq('IdMatch', id);

    if (error) throw error;

    res.status(200).json({ message: 'Score mis à jour avec succès.', score: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un score
export const deleteScore = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('Scores')
      .delete()
      .eq('IdMatch', id);

    if (error) throw error;

    res.status(200).json({ message: 'Score supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
