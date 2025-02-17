import { supabase } from '../Config/Supabase.js';

// Récupérer all terrains 
export const getTerrains = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('terrain')
      .select(`
        idterrain,
        nom_equipe,
        couleur_equipe,
        typeterrain (
          idtypeterrain,
          libelle,
          description,
          nbpersonne
        )
      `);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un nouveau terrain
export const createTerrain = async (req, res) => {
  const { nomEquipe, couleurEquipe, idtypeterrain } = req.body;

  try {
    if (!nomEquipe || !couleurEquipe || !idtypeterrain) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const { data, error } = await supabase
      .from('terrain')
      .insert([{ nom_equipe: nomEquipe, couleur_equipe: couleurEquipe, idtypeterrain }]);

    if (error) throw error;

    res.status(201).json({ message: 'Terrain créé avec succès.', terrain: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un terrain existant
export const updateTerrain = async (req, res) => {
  const { id } = req.params;
  const { nomEquipe, couleurEquipe, idtypeterrain } = req.body;

  try {
    if (!nomEquipe || !couleurEquipe || !idtypeterrain) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const { data, error } = await supabase
      .from('terrain')
      .update({ nom_equipe: nomEquipe, couleur_equipe: couleurEquipe, idtypeterrain })
      .eq('idterrain', id);

    if (error) throw error;

    res.status(200).json({ message: 'Terrain mis à jour avec succès.', terrain: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un terrain
export const deleteTerrain = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('terrain')
      .delete()
      .eq('idterrain', id);

    if (error) throw error;

    res.status(200).json({ message: 'Terrain supprimé avec succès.', terrain: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les types de terrains
export const getTypesTerrain = async (req, res) => {
  try {
    const { data, error } = await supabase.from('typeterrain').select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
