import express from 'express';
import {
  getTerrains,
  createTerrain,
  updateTerrain,
  deleteTerrain,
  getTypesTerrain,
} from '../Controllers/TerrainControllers.js';

const router = express.Router();

// Routes pour les terrains
router.get('/', getTerrains); 
router.post('/', createTerrain); 
router.put('/:id', updateTerrain);
router.delete('/:id', deleteTerrain);

router.get('/types', getTypesTerrain); 

export default router;
