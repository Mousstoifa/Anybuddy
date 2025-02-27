"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReservationControllers_js_1 = require("../Controllers/ReservationControllers.js");
const router = express_1.default.Router();
// Routes pour les réservations
router.get('/', ReservationControllers_js_1.getReservations); // Récupérer toutes les réservations
router.get("/terrain/:idTerrain", ReservationControllers_js_1.getReservationsByTerrain);
router.post('/', ReservationControllers_js_1.createReservation); // Ajouter une réservation
router.put('/:id', ReservationControllers_js_1.updateReservation); // Modifier une réservation
router.delete('/:id', ReservationControllers_js_1.deleteReservation); // Supprimer une réservation
exports.default = router;
//# sourceMappingURL=ReservationRoutes.js.map