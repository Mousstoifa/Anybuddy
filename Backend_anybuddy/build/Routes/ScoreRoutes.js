"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ScoreControllers_js_1 = require("../Controllers/ScoreControllers.js");
const router = express_1.default.Router();
// Routes pour les scores
router.get('/', ScoreControllers_js_1.getScores); // Récupérer tous les scores
router.post('/', ScoreControllers_js_1.createScore); // Ajouter un score
router.put('/:id', ScoreControllers_js_1.updateScore); // Modifier un score
router.delete('/:id', ScoreControllers_js_1.deleteScore); // Supprimer un score
exports.default = router;
//# sourceMappingURL=ScoreRoutes.js.map