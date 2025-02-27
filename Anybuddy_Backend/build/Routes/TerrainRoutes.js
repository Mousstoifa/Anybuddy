"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TerrainControllers_js_1 = require("../Controllers/TerrainControllers.js");
const router = express_1.default.Router();
// Routes pour les terrains
router.get('/', TerrainControllers_js_1.getTerrains);
router.post('/', TerrainControllers_js_1.createTerrain);
router.put('/:id', TerrainControllers_js_1.updateTerrain);
router.delete('/:id', TerrainControllers_js_1.deleteTerrain);
router.get('/types', TerrainControllers_js_1.getTypesTerrain);
exports.default = router;
//# sourceMappingURL=TerrainRoutes.js.map