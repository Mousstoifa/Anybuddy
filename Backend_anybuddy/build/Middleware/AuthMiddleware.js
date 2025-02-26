"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(403).json({ message: "Accès refusé, token manquant" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Stocke les infos de l'utilisateur dans la requête
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=AuthMiddleware.js.map