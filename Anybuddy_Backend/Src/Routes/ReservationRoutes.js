import express from 'express';
import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from '../Controllers/ReservationControllers.js';

const router = express.Router();

// Routes pour les réservations
router.get('/', getReservations); // Récupérer toutes les réservations
router.post('/', createReservation); // Ajouter une réservation
router.put('/:id', updateReservation); // Modifier une réservation
router.delete('/:id', deleteReservation); // Supprimer une réservation

export default router;
