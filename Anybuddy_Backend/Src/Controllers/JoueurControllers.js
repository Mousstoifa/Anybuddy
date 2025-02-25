import { supabase } from '../Config/Supabase.js';

// Ajouter un joueur à une équipe
export const addJoueurToEquipe = async (req, res) => {
  const { idEquipe } = req.params;
  const { Nom, Poste } = req.body;

  try {
    const { data, error } = await supabase.from('Joueur').insert([{ IdEquipe: idEquipe, Nom, Poste }]);
    if (error) throw error;
    res.status(201).json({ message: 'Joueur ajouté avec succès.', joueur: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
