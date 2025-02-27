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
exports.deleteReservation = exports.updateReservation = exports.createReservation = exports.getReservationsByTerrain = exports.getReservations = void 0;
const Supabase_js_1 = require("../Config/Supabase.js");
// Get all réservations 
const getReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('reservation')
            .select(`
      idreservation,
      horaire,
      duree,
      prix,
      "idDisponibilite",
      disponibilite (
        "idDisponibilite",
        datedebut,
        datefin,
        idterrain
      )
    `);
        console.log(data, error);
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getReservations = getReservations;
const getReservationsByTerrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTerrain } = req.params; // Récupère l'ID du terrain depuis l'URL
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from("reservation")
            .select(`
    idreservation,
    horaire,
    duree,
    prix,
    idDisponibilite,
    disponibilite (
      idDisponibilite,
      datedebut,
      datefin,
      idterrain
    )
  `);
        if (error)
            throw error;
        res.status(200).json(data);
    }
    catch (error) {
        console.error("🚨 Erreur API :", error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.getReservationsByTerrain = getReservationsByTerrain;
// Créer une nouvelle réservation
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { horaire, duree, prix, idDisponibilite, joueurs } = req.body;
    try {
        if (!horaire || !duree || !prix || !idDisponibilite || !joueurs || joueurs.length === 0) {
            return res.status(400).json({ error: 'Tous les champs sont requis et au moins un joueur.' });
        }
        // ✅ Étape 1: Créer la réservation et récupérer son ID
        const { data: reservation, error: reservationError } = yield Supabase_js_1.supabase
            .from('reservation')
            .insert([{ horaire, duree, prix, idDisponibilite }])
            .select(); // Récupérer l'ID inséré
        if (reservationError)
            throw reservationError;
        const reservationId = reservation[0].idreservation;
        // ✅ Étape 2: Insérer plusieurs joueurs avec cet ID de réservation
        const joueursInsert = joueurs.map((idutilisateur) => ({
            idutilisateur,
            idreservation: reservationId, // Utilisation de l'ID fraîchement inséré
        }));
        const { error: reserverError } = yield Supabase_js_1.supabase
            .from('reserver')
            .insert(joueursInsert);
        if (reserverError)
            throw reserverError;
        res.status(201).json({
            message: 'Réservation créée avec succès pour plusieurs joueurs.',
            reservation: reservation[0],
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createReservation = createReservation;
// Modifier une réservation existante
const updateReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { horaire, duree, prix, idDisponibilite } = req.body;
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('reservation')
            .update({ horaire, duree, prix, idDisponibilite })
            .eq('idreservation', id);
        if (error)
            throw error;
        res.status(200).json({ message: 'Réservation mise à jour avec succès.', reservation: data });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateReservation = updateReservation;
// Supprimer une réservation
const deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { data, error } = yield Supabase_js_1.supabase
            .from('reservation')
            .delete()
            .eq('idreservation', id);
        if (error)
            throw error;
        res.status(200).json({ message: 'Réservation supprimée avec succès.' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteReservation = deleteReservation;
//# sourceMappingURL=ReservationControllers.js.map