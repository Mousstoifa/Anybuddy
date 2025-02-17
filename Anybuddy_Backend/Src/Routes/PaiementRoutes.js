import express from 'express';
import {
  getPaiements,
  createPaiement,
  updatePaiement,
  deletePaiement,
} from '../Controllers/PaiementControllers.js';

const router = express.Router();

// Routes pour les paiements
router.get('/', getPaiements); // Récupérer tous les paiements
router.post('/', createPaiement); // Ajouter un paiement
router.put('/:id', updatePaiement); // Modifier un paiement
router.delete('/:id', deletePaiement); // Supprimer un paiement

export default router;
