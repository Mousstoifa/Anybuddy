import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import fetchMock from "jest-fetch-mock";
import Contact from "../Pages/Contact"; // Le composant de connexion
import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native/extend-expect";
import { describe, it, expect, beforeEach } from "@jest/globals";

fetchMock.enableMocks();

describe("🔍 Test d'authentification", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  // ✅ Test : Connexion avec un email et mot de passe valides
  it("🟢 Connecte l'utilisateur si l'email et le mot de passe sont corrects", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          email: "momo@gmail.com",
          mdp: "$2b$10$hashedpassword", // Simule un mot de passe hashé
          nom: "Momo",
          prenom: "Joueur",
        },
      ])
    );

    const { getByPlaceholderText, getByText, queryByText } = render(<Contact />);

    fireEvent.changeText(getByPlaceholderText("Email"), "momo@gmail.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "MdpValide");
    fireEvent.press(getByText("Se connecter"));

    await waitFor(() => {
      expect(queryByText("Bienvenue, Momo Joueur")).toBeTruthy();
    });
  });

  // ❌ Test : Connexion avec un email incorrect
  it("🔴 Affiche une erreur si l'email est incorrect", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([])); // Simule aucun utilisateur trouvé

    const { getByPlaceholderText, getByText, queryByText } = render(<Contact />);

    fireEvent.changeText(getByPlaceholderText("Email"), "inconnu@gmail.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "MdpInvalide");
    fireEvent.press(getByText("Se connecter"));

    await waitFor(() => {
      expect(queryByText("Email incorrect.")).toBeTruthy();
    });
  });

  // 🆕 Test : Inscription d’un nouvel utilisateur
  it("🆕 Inscription d'un nouvel utilisateur", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Inscription réussie" }), // Réponse simulée de l’API
      { status: 201 }
    );

    const { getByPlaceholderText, getByText, queryByText } = render(<Contact />);

    fireEvent.changeText(getByPlaceholderText("Email"), "newuser@gmail.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "NewUserPass");
    fireEvent.press(getByText("Inscription"));

    await waitFor(() => {
      expect(queryByText("Votre compte a été créé !")).toBeTruthy();
    });
  });
});
