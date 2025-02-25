const request = require("supertest");
const app = require("../App"); 

describe("Tests API Authentification", () => {
  
  it("Inscrit un nouvel utilisateur", async () => {
    const res = await request(app)
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
  });

  it("🟢 Connecte un utilisateur valide", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        email: "testuser@gmail.com",
        mdp: "Password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined(); // Vérifie qu'un token est retourné
  });

  it("🔴 Échec si l'email est incorrect", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        email: "wronguser@gmail.com",
        mdp: "Password123",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Email ou mot de passe incorrect.");
  });

  // ❌ Test : Connexion avec un mauvais mot de passe
  it("🔴 Échec si le mot de passe est incorrect", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        email: "user@gmail.com",
        mdp: "WrongPassword",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Email ou mot de passe incorrect.");
  });
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 15)); // Attendre la fin des requêtes async
    jest.clearAllMocks();
});

});