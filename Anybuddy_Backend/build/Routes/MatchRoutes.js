"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MatchControllers_js_1 = require("../Controllers/MatchControllers.js");
const router = express_1.default.Router();
// Routes pour les matchs
router.get('/', MatchControllers_js_1.getMatchs); // Récupérer tous les matchs
router.post('/', MatchControllers_js_1.createMatch); // Ajouter un match
router.put('/:id', MatchControllers_js_1.updateMatch); // Modifier un match
router.delete('/:id', MatchControllers_js_1.deleteMatch); // Supprimer un match
exports.default = router;
//# sourceMappingURL=MatchRoutes.js.map