"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const SignupRoutes_js_1 = __importDefault(require("../Src/Routes/SignupRoutes.js"));
const LoginRoutes_js_1 = __importDefault(require("../Src/Routes/LoginRoutes.js"));
const TerrainRoutes_js_1 = __importDefault(require("../Src/Routes/TerrainRoutes.js"));
const ReservationRoutes_js_1 = __importDefault(require("../Src/Routes/ReservationRoutes.js"));
const MatchRoutes_js_1 = __importDefault(require("./Routes/MatchRoutes.js"));
const ScoreRoutes_js_1 = __importDefault(require("./Routes/ScoreRoutes.js"));
const PaiementRoutes_js_1 = __importDefault(require("./Routes/PaiementRoutes.js"));
const EquipeRoutes_js_1 = __importDefault(require("./Routes/EquipeRoutes.js"));
const JoueurRoutes_js_1 = __importDefault(require("./Routes/JoueurRoutes.js"));
const UserRoutes_js_1 = __importDefault(require("./Routes/UserRoutes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/signup', SignupRoutes_js_1.default);
app.use('/api/login', LoginRoutes_js_1.default);
app.use('/api/terrains', TerrainRoutes_js_1.default);
app.use('/api/reservations', ReservationRoutes_js_1.default);
app.use('/api/matchs', MatchRoutes_js_1.default);
app.use('/api/scores', ScoreRoutes_js_1.default);
app.use('/api/paiement', PaiementRoutes_js_1.default);
app.use('/api/equipes', EquipeRoutes_js_1.default);
app.use('/api/equipes', JoueurRoutes_js_1.default);
app.use("/api/users", UserRoutes_js_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
exports.default = app;
//# sourceMappingURL=App.js.map