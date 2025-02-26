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
exports.getTerrainById = exports.getTypesTerrain = exports.deleteTerrain = exports.updateTerrain = exports.createTerrain = exports.getTerrains = void 0;
const Supabase_js_1 = require("../Config/Supabase.js");
// Récupérer all terrains 
const getTerrains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('terrain')
            .select(`
        idterrain,
        nom_equipe,
        couleur_equipe,
        typeterrain (
          idtypeterrain,
          libelle,
          description,
          nbpersonne
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
exports.getTerrains = getTerrains;
// Ajouter un nouveau terrain
const createTerrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomEquipe, couleurEquipe, idtypeterrain } = req.body;
    try {
        if (!nomEquipe || !couleurEquipe || !idtypeterrain) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }
        const { data, error } = yield Supabase_js_1.supabase
            .from('terrain')
            .insert([{ nom_equipe: nomEquipe, couleur_equipe: couleurEquipe, idtypeterrain }]);
        if (error)
            throw error;
        res.status(201).json({ message: 'Terrain créé avec succès.', terrain: data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createTerrain = createTerrain;
// Modifier un terrain existant
const updateTerrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nomEquipe, couleurEquipe, idtypeterrain } = req.body;
    try {
        if (!nomEquipe || !couleurEquipe || !idtypeterrain) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }
        const { data, error } = yield Supabase_js_1.supabase
            .from('terrain')
            .update({ nom_equipe: nomEquipe, couleur_equipe: couleurEquipe, idtypeterrain })
            .eq('idterrain', id);
        if (error)
            throw error;
        res.status(200).json({ message: 'Terrain mis à jour avec succès.', terrain: data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateTerrain = updateTerrain;
// Supprimer un terrain
const deleteTerrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('terrain')
            .delete()
            .eq('idterrain', id);
        if (error)
            throw error;
        res.status(200).json({ message: 'Terrain supprimé avec succès.', terrain: data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteTerrain = deleteTerrain;
// Récupérer tous les types de terrains
const getTypesTerrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield Supabase_js_1.supabase.from('typeterrain').select('*');
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTypesTerrain = getTypesTerrain;
const getTerrainById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from("terrain")
            .select(`
        idterrain,
        nom_equipe,
        couleur_equipe,
        typeterrain (
          idtypeterrain,
          libelle,
          description,
          nbpersonne
        )
      `)
            .eq("idterrain", id)
            .single();
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTerrainById = getTerrainById;
//# sourceMappingURL=TerrainControllers.js.map