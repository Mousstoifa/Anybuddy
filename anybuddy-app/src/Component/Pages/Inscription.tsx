import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Inscription = () => {
  const navigation = useNavigation();

  // États du formulaire
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setmdp] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [code_postal, setCodePostal] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  // Fonction d'inscription
  const handleSignup = async () => {
    if (!nom || !prenom || !email || !mdp || !adresse || !ville || !code_postal || !role) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires !");
      return;
    }

    setLoading(true);


  const userData = {
    nom,
    prenom,
    email,
    mdp, 
    role,
    adresse,
    code_postal, 
    ville,
  };



    try {
      const response = await fetch("http://192.168.1.14:5000/api/signup", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, email, mdp, adresse, ville, code_postal, role }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Succès", "Inscription réussie !");
        console.log("Contact"); // Rediriger vers la page de connexion
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      Alert.alert("Erreur", "Impossible de se connecter au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <Text style={styles.subtitle}>Créez votre compte</Text>

      {/* Formulaire */}
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
        <TextInput style={styles.input} placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry value={mdp} onChangeText={setmdp} />
        <TextInput style={styles.input} placeholder="Adresse" value={adresse} onChangeText={setAdresse} />
        <TextInput style={styles.input} placeholder="Ville" value={ville} onChangeText={setVille} />
        <TextInput style={styles.input} placeholder="Code Postal" keyboardType="numeric" value={code_postal} onChangeText={setCodePostal} />
        <TextInput style={styles.input} placeholder="Rôle" value={role} onChangeText={setRole} />

        {/* Bouton d'inscription */}
        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Inscription en cours" : "S'inscrire"}</Text>
        </TouchableOpacity>

        {/* Lien pour se connecter */}
        <TouchableOpacity onPress={() => console.log("Contact")}>
          <Text style={styles.footerText}>
            Déjà un compte? <Text style={styles.createAccountText}>Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 18, color: "#666", marginVertical: 10 },
  form: { width: "100%", marginTop: 20 },
  input: { width: "100%", height: 50, borderColor: "#ddd", borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 15, backgroundColor: "#f9f9f9" },
  button: { backgroundColor: "#FF5722", height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  footerText: { textAlign: "center", color: "#666", fontSize: 14 },
  createAccountText: { color: "#FF5722", fontWeight: "bold" },
});

export default Inscription;
