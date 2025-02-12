import express from 'express';
import { addJoueurToEquipe } from '../Controllers/JoueurControllers.js';

const router = express.Router();

// Ajouter un joueur à une équipe
router.post('/:idEquipe/joueurs', addJoueurToEquipe);

export default router;
