import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { supabase } from '../Config/Supabase.js';

dotenv.config();

export const loginUser = async (req, res) => {
    const { email, mdp } = req.body;

    console.log("🔍 Tentative de connexion avec l'email :", email); // Debug

    try {
        // 🔹 Vérification si l'utilisateur existe
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle(); // ✅ Évite l'erreur si aucun utilisateur trouvé

        if (!user) {
            console.warn("⛔ Aucun utilisateur trouvé avec cet email :", email);
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        if (error) {
            console.error("❌ Erreur lors de la récupération de l'utilisateur :", error.message);
            return res.status(500).json({ message: "Erreur serveur, veuillez réessayer plus tard." });
        }

        // 🔹 Vérification du mot de passe
        const isMatch = await bcrypt.compare(mdp, user.mdp);
        if (!isMatch) {
            console.warn("⛔ Mot de passe incorrect pour :", email);
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // 🔹 Génération du token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // Token valide 1 jour
        );

        console.log("✅ Connexion réussie pour :", email); // Debug
        res.status(200).json({ message: "Connexion réussie.", token });

    } catch (error) {
        console.error("❌ Erreur serveur :", error.message);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};