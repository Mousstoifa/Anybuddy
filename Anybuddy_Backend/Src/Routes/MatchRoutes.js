import express from 'express';
import {
  getMatchs,
  createMatch,
  updateMatch,
  deleteMatch,
} from '../Controllers/MatchControllers.js';

const router = express.Router();

// Routes pour les matchs
router.get('/', getMatchs); // Récupérer tous les matchs
router.post('/', createMatch); // Ajouter un match
router.put('/:id', updateMatch); // Modifier un match
router.delete('/:id', deleteMatch); // Supprimer un match

export default router;
