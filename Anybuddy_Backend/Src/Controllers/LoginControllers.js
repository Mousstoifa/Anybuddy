import bcrypt from 'bcrypt';
import { supabase } from '../Config/Supabase.js';

export const loginUser = async (req, res) => {
    const { email, mdp } = req.body;

    try {
        const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(mdp, user.mdp);

        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect." });
        }

        res.status(200).json({ message: "Connexion réussie.", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
