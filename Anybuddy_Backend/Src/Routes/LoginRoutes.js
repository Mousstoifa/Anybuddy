import express from 'express';
import { loginUser } from '../Controllers/LoginControllers.js';

const router = express.Router();

// Route de connexion
router.post('/', loginUser);

export default router;

