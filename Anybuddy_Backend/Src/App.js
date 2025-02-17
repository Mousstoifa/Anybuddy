//import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRoute from '../Src/Routes/SignupRoutes.js';
import loginRoute from '../Src/Routes/LoginRoutes.js';
import terrainRoutes from '../Src/Routes/TerrainRoutes.js';
import reservationRoutes from '../Src/Routes/ReservationRoutes.js';
import matchRoutes from './Routes/MatchRoutes.js';
import scoreRoutes from './Routes/ScoreRoutes.js';
import paiementRoutes from './Routes/PaiementRoutes.js'
import equipeRoutes from './Routes/EquipeRoutes.js';
import joueurRoutes from './Routes/JoueurRoutes.js';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/terrains', terrainRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/matchs', matchRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/paiement',paiementRoutes);
app.use('/api/equipes', equipeRoutes);
app.use('/api/equipes', joueurRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));


