"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JoueurControllers_js_1 = require("../Controllers/JoueurControllers.js");
const router = express_1.default.Router();
// Ajouter un joueur à une équipe
router.post('/:idEquipe/joueurs', JoueurControllers_js_1.addJoueurToEquipe);
exports.default = router;
//# sourceMappingURL=JoueurRoutes.js.map