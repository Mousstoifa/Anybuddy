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
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const Supabase_js_1 = require("../Config/Supabase.js");
dotenv_1.default.config();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, mdp } = req.body;
    try {
        // 🔹 Vérification si l'utilisateur existe
        const { data: user, error } = yield Supabase_js_1.supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle(); //pour gerer l'erreur si not user  find
        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }
        const isMatch = yield bcrypt_1.default.compare(mdp, user.mdp);
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }
        // c'est ici qu'on génére le token  JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" } //  Validité du token
        );
        res.status(200).json({ message: "Connexion réussie.", token });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=LoginControllers.js.map