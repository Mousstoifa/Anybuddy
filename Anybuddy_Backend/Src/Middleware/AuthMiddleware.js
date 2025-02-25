import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ message: "Accès refusé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Stocke les infos de l'utilisateur dans la requête
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }
};