import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { supabase } from '../Config/Supabase.js';

dotenv.config();

export const loginUser = async (req, res) => {
    const { email, mdp } = req.body;
    try {
        // 🔹 Vérification si l'utilisateur existe
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle(); //pour gerer l'erreur si not user  find

        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }
        const isMatch = await bcrypt.compare(mdp, user.mdp);
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // c'est ici qu'on génére le token  JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } //  Validité du token
        );

        res.status(200).json({ message: "Connexion réussie.", token });

    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};