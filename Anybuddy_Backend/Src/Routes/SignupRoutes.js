import express from 'express';
import { createUser } from '../Controllers/SignupControllers.js';

const router = express.Router();

// Route d'inscription
router.post('/', createUser);

export default router;
