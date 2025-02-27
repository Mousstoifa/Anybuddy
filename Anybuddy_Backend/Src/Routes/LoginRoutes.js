import express from 'express';
import { loginUser } from '../Controllers/LoginControllers.js';

const router = express.Router();

router.post('/', loginUser);

export default router;

