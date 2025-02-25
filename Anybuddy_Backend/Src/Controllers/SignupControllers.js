import bcrypt from 'bcrypt';
import { supabase } from '../Config/Supabase.js';

export const createUser = async (req, res) => {

    const { nom, prenom, email, mdp, role, adresse, code_postal, ville } = req.body;

    try {
        // Validation des champs
        if (!nom || !prenom || !email || !mdp || !role || !adresse || !code_postal || !ville) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }
        // Vérification si l'utilisateur existe déjà
        const { data: existingUser, error: errorUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (errorUser) {
            console.error("❌ Erreur lors de la vérification de l'utilisateur :", errorUser.message);
        }

        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }


        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(mdp, 10);

        // Données prêtes pour l'insertion
        const userData = { nom, prenom, email, mdp: hashedPassword, role, adresse, code_postal, ville };

        // Ajout de l'utilisateur à la base de données
        const { data, error } = await supabase.from('users').insert([userData]);

        if (error) {
            console.error("❌ Erreur lors de l'insertion dans Supabase :", error.message);
            throw error;
        }

        res.status(201).json({ message: 'Inscription réussie', user: data });

    } catch (error) {
        console.error("❌ Erreur serveur :", error.message);
        res.status(500).json({ error: error.message });
    }
};