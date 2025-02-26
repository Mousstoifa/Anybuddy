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
exports.deleteMatch = exports.updateMatch = exports.createMatch = exports.getMatchs = void 0;
const Supabase_js_1 = require("../Config/Supabase.js");
// Récupérer tous les matchs avec les informations associées
const getMatchs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('Matchs')
            .select(`
        IdMatch,
        DateMatch,
        NomMatch,
        Terrain (
          IdTerrain,
          Nom_Equipe,
          Couleur_Equipe
        )
      `);
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMatchs = getMatchs;
// Créer un nouveau match
const createMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { DateMatch, NomMatch, IdTerrain } = req.body;
    try {
        if (!DateMatch || !NomMatch || !IdTerrain) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }
        const { data, error } = yield Supabase_js_1.supabase
            .from('Matchs')
            .insert([{ DateMatch, NomMatch, IdTerrain }]);
        if (error)
            throw error;
        res.status(201).json({ message: 'Match créé avec succès.', match: data[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createMatch = createMatch;
// Modifier un match existant
const updateMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { DateMatch, NomMatch, IdTerrain } = req.body;
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('Matchs')
            .update({ DateMatch, NomMatch, IdTerrain })
            .eq('IdMatch', id);
        if (error)
            throw error;
        res.status(200).json({ message: 'Match mis à jour avec succès.', match: data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateMatch = updateMatch;
// Supprimer un match
const deleteMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('Matchs')
            .delete()
            .eq('IdMatch', id);
        if (error)
            throw error;
        res.status(200).json({ message: 'Match supprimé avec succès.' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteMatch = deleteMatch;
//# sourceMappingURL=MatchControllers.js.map