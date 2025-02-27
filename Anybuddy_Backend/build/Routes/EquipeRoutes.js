"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EquipeControllers_js_1 = require("../Controllers/EquipeControllers.js");
const router = express_1.default.Router();
// Récupérer toutes les équipes
router.get('/', EquipeControllers_js_1.getEquipes);
// Créer une équipe
router.post('/', EquipeControllers_js_1.createEquipe);
exports.default = router;
//# sourceMappingURL=EquipeRoutes.js.map