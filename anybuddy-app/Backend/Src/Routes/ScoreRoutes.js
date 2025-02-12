import express from 'express';
import {
  getScores,
  createScore,
  updateScore,
  deleteScore,
} from '../Controllers/ScoreControllers.js';

const router = express.Router();

// Routes pour les scores
router.get('/', getScores); // Récupérer tous les scores
router.post('/', createScore); // Ajouter un score
router.put('/:id', updateScore); // Modifier un score
router.delete('/:id', deleteScore); // Supprimer un score

export default router;
