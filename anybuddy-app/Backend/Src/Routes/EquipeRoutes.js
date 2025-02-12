import express from 'express';
import { getEquipes, createEquipe } from '../Controllers/EquipeControllers.js';

const router = express.Router();

// Récupérer toutes les équipes
router.get('/', getEquipes);

// Créer une équipe
router.post('/', createEquipe);

export default router;
