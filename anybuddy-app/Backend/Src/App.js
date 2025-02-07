import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRoute from '../Src/Routes/SignupRoutes.js';
import loginRoute from '../Src/Routes/LoginRoutes.js';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));


