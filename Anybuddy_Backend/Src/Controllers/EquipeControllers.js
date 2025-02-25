import { supabase } from '../Config/Supabase.js';

// Récupérer toutes les équipes
export const getEquipes = async (req, res) => {
  try {
    const { data, error } = await supabase.from('equipe').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une équipe
export const createEquipe = async (req, res) => {
  const { nomequipe, idutilisateur } = req.body;
  try {
    const { data, error } = await supabase.from('equipe').insert([{ nomequipe, idutilisateur }]);
    if (error) throw error;
    res.status(201).json({ message: 'Équipe créée avec succès.', equipe: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
