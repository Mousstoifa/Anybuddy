"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PaiementControllers_js_1 = require("../Controllers/PaiementControllers.js");
const router = express_1.default.Router();
// Routes pour les paiements
router.get('/', PaiementControllers_js_1.getPaiements); // Récupérer tous les paiements
router.post('/', PaiementControllers_js_1.createPaiement); // Ajouter un paiement
router.put('/:id', PaiementControllers_js_1.updatePaiement); // Modifier un paiement
router.delete('/:id', PaiementControllers_js_1.deletePaiement); // Supprimer un paiement
exports.default = router;
//# sourceMappingURL=PaiementRoutes.js.map