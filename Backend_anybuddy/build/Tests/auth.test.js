"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require("supertest");
const app = require("../App");
describe("Tests API Authentification", () => {
    it("Inscrit un nouvel utilisateur", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post("/api/signup")
            .send({
            nom: "Test",
            prenom: "User",
            email: "testuser@gmail.com",
            mdp: "Password123",
            role: "joueur",
            adresse: "Paris",
            code_postal: "75000",
            ville: "Paris"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Inscription réussie");
    }));
    it("🟢 Connecte un utilisateur valide", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post("/api/login")
            .send({
            email: "testuser@gmail.com",
            mdp: "Password123",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined(); // Vérifie qu'un token est retourné
    }));
    it("🔴 Échec si l'email est incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post("/api/login")
            .send({
            email: "wronguser@gmail.com",
            mdp: "Password123",
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe("Email ou mot de passe incorrect.");
    }));
    // ❌ Test : Connexion avec un mauvais mot de passe
    it("🔴 Échec si le mot de passe est incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post("/api/login")
            .send({
            email: "user@gmail.com",
            mdp: "WrongPassword",
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe("Email ou mot de passe incorrect.");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, 15)); // Attendre la fin des requêtes async
        jest.clearAllMocks();
    }));
});
//# sourceMappingURL=auth.test.js.map