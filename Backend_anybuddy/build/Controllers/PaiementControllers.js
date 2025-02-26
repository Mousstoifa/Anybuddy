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
exports.deletePaiement = exports.updatePaiement = exports.createPaiement = exports.getPaiements = void 0;
const Supabase_js_1 = require("../Config/Supabase.js");
// Récupérer tous les paiements avec les informations associées
const getPaiements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('Paiement')
            .select(`
        IdPaiement,
        Montant,
        Mode_Paiement,
        DatePaiement,
        Reservation (
          IdReservation,
          Horaire,
          Duree,
          Prix
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
exports.getPaiements = getPaiements;
// Créer un nouveau paiement
const createPaiement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdReservation, Montant, Mode_Paiement, DatePaiement } = req.body;
    try {
        if (!IdReservation || !Montant || !Mode_Paiement || !DatePaiement) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }
        const { data, error } = yield Supabase_js_1.supabase
            .from('Paiement')
            .insert([{ IdReservation, Montant, Mode_Paiement, DatePaiement }]);
        if (error)
            throw error;
        res.status(201).json({ message: 'Paiement créé avec succès.', paiement: data[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createPaiement = createPaiement;
// Modifier un paiement existant
const updatePaiement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { Montant, Mode_Paiement, DatePaiement } = req.body;
    try {
        const updates = {};
        if (Montant !== undefined)
            updates.Montant = Montant;
        if (Mode_Paiement !== undefined)
            updates.Mode_Paiement = Mode_Paiement;
        if (DatePaiement !== undefined)
            updates.DatePaiement = DatePaiement;
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'Aucune donnée fournie pour la mise à jour.' });
        }
        const { data, error } = yield Supabase_js_1.supabase
            .from('Paiement')
            .update(updates)
            .eq('IdPaiement', id);
        if (error)
            throw error;
        res.status(200).json({ message: 'Paiement mis à jour avec succès.', paiement: data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updatePaiement = updatePaiement;
// Supprimer un paiement
const deletePaiement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('Paiement')
            .delete()
            .eq('IdPaiement', id);
        if (error)
            throw error;
        res.status(200).json({ message: 'Paiement supprimé avec succès.' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deletePaiement = deletePaiement;
//# sourceMappingURL=PaiementControllers.js.map