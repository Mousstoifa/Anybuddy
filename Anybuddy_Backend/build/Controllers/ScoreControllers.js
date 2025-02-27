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
exports.deleteScore = exports.updateScore = exports.createScore = exports.getScores = void 0;
const Supabase_js_1 = require("../Config/Supabase.js");
// Récupérer tous les scores avec les matchs et équipes associés
const getScores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('Scores')
            .select(`
        IdMatch,
        IdEquipe,
        Points,
        Matchs (
          NomMatch,
          DateMatch
        ),
        Equipe (
          NomEquipe
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
exports.getScores = getScores;
// Ajouter un score pour un match et une équipe
const createScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdMatch, IdEquipe, Points } = req.body;
    try {
        if (!IdMatch || !IdEquipe || Points === undefined) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }
        const { data, error } = yield Supabase_js_1.supabase
            .from('Scores')
            .insert([{ IdMatch, IdEquipe, Points }]);
        if (error)
            throw error;
        res.status(201).json({ message: 'Score ajouté avec succès.', score: data[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createScore = createScore;
// Modifier un score existant
const updateScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { Points } = req.body;
    try {
        if (Points === undefined) {
            return res.status(400).json({ error: 'Les points sont requis.' });
        }
        const { data, error } = yield Supabase_js_1.supabase
            .from('Scores')
            .update({ Points })
            .eq('IdMatch', id);
        if (error)
            throw error;
        res.status(200).json({ message: 'Score mis à jour avec succès.', score: data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateScore = updateScore;
// Supprimer un score
const deleteScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('Scores')
            .delete()
            .eq('IdMatch', id);
        if (error)
            throw error;
        res.status(200).json({ message: 'Score supprimé avec succès.' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteScore = deleteScore;
//# sourceMappingURL=ScoreControllers.js.map