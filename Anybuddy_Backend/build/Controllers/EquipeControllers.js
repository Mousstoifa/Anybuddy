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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEquipe = exports.getEquipes = void 0;
const Supabase_js_1 = require("../Config/Supabase.js");
// Récupérer toutes les équipes
const getEquipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield Supabase_js_1.supabase.from('equipe').select('*');
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEquipes = getEquipes;
// Créer une équipe
const createEquipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomequipe, idutilisateur } = req.body;
    try {
        const { data, error } = yield Supabase_js_1.supabase.from('equipe').insert([{ nomequipe, idutilisateur }]);
        if (error)
            throw error;
        res.status(201).json({ message: 'Équipe créée avec succès.', equipe: data[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createEquipe = createEquipe;
//# sourceMappingURL=EquipeControllers.js.map