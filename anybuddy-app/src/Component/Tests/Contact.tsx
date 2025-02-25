import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import fetchMock from "jest-fetch-mock";
import Contact from "../Pages/Contact";
import "@testing-library/jest-native/extend-expect"; // ✅ Ajoute les assertions spécifiques à React Native
import { describe, it, expect, beforeEach } from "@jest/globals";

fetchMock.enableMocks();

describe("Test de connexion", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("Affiche une erreur si l'email est incorrect", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([])); // Simule aucun utilisateur trouvé

    const { getByPlaceholderText, getByText, queryByText } = render(<Contact />);

    fireEvent.changeText(getByPlaceholderText("Email"), "inconnu@gmail.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "MdpInvalide");
    fireEvent.press(getByText("Se connecter"));

    await waitFor(() => {
      expect(queryByText("Email incorrect.")).not.toBeNull(); // ✅ Correction de `toBeTruthy()`
    });
  });

  it("Connecte l'utilisateur si l'email et le mot de passe sont bons", async () => {
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
      expect(queryByText("Bienvenue, Momo Joueur")).not.toBeNull(); // ✅ Correction de `toBeTruthy()`
    });
  });
});
