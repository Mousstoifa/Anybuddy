import bcrypt from 'bcrypt';
import { supabase } from '../Config/Supabase.js';

export const createUser = async (req, res) => {
    const { nom, prenom, email, mdp, role } = req.body;

    try {
        // Validation des champs
        if (!nom || !prenom || !email || !mdp || !role) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }

        // Vérifie si l'utilisateur existe déjà
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }

        // Hache le mot de passe
        const hashedPassword = await bcrypt.hash(mdp, 10);

        // Ajoute l'utilisateur à la base de données
        const { data, error } = await supabase
            .from('users')
            .insert([{ nom, prenom, email, mdp: hashedPassword, role }]);

        if (error) throw error;

        res.status(201).json({ message: 'Utilisateur créé avec succès.', user: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
