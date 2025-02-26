"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Supabase_js_1 = require("../Config/Supabase.js");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom, prenom, email, mdp, role, adresse, code_postal, ville } = req.body;
    try {
        // Validation des champs
        if (!nom || !prenom || !email || !mdp || !role || !adresse || !code_postal || !ville) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }
        // Vérification si l'utilisateur existe déjà
        const { data: existingUser, error: errorUser } = yield Supabase_js_1.supabase
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
        const hashedPassword = yield bcrypt_1.default.hash(mdp, 10);
        // Données prêtes pour l'insertion
        const userData = { nom, prenom, email, mdp: hashedPassword, role, adresse, code_postal, ville };
        // Ajout de l'utilisateur à la base de données
        const { data, error } = yield Supabase_js_1.supabase.from('users').insert([userData]);
        if (error) {
            console.error("❌ Erreur lors de l'insertion dans Supabase :", error.message);
            throw error;
        }
        res.status(201).json({ message: 'Inscription réussie', user: data });
    }
    catch (error) {
        console.error("❌ Erreur serveur :", error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
//# sourceMappingURL=SignupControllers.js.map