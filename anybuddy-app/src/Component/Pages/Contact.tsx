import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList, RootTabParamList } from "../../.././App";


const Contact = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList & RootTabParamList>>();
  const [email, setEmail] = useState("");
  const [mdp, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
  
    try {
      const response = await fetch(
        `http://192.168.1.14:5000/api/users?email=${encodeURIComponent(email)}&mdp=${encodeURIComponent(mdp)}`, 
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Réponse API:", data); // ✅ Voir la réponse exacte
  
      if (data.user) {
        Alert.alert("Connexion réussie", `Bienvenue, ${data.user.name}`);
        navigation.navigate("Home");
      } else {
        Alert.alert("Erreur", data.message || "Identifiants incorrects.");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      Alert.alert("Erreur", `Impossible de se connecter : ${error}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      {/* Formulaire */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={mdp}
          onChangeText={setPassword}
        />

        {/* Bouton de connexion */}
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Connexion..." : "Se connecter"}</Text>
        </TouchableOpacity>

        {/* Boutons avec logos */}
        <View style={styles.socialContainer}>
          {/* Bouton Google */}
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="google" size={24} color="#db4437" />
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </TouchableOpacity>

          {/* Bouton Facebook */}
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="facebook" size={24} color="#4267B2" />
            <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Bouton d'inscription avec redirection vers Inscription.tsx */}
        <TouchableOpacity onPress={() => navigation.navigate("Inscription")}>
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={styles.createAccountText}>Inscription</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9", // 🌿 Vert clair pour correspondre à l'univers Anybuddy
    paddingHorizontal: 20,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#1B5E20" }, // 💚 Vert foncé pour le texte
  subtitle: { fontSize: 18, color: "#388E3C", marginVertical: 10 },
  form: { width: "100%", marginTop: 20 },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#C8E6C9", // 🟢 Vert clair pour la bordure
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#F1F8E9", // 🌱 Fond légèrement teinté vert
  },
  button: {
    backgroundColor: "#2E7D32", // ✅ Vert foncé Anybuddy pour le bouton
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  socialContainer: { marginVertical: 15 },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#C8E6C9", 
    borderWidth: 1,
  },
  socialButtonText: { fontSize: 16, marginLeft: 10, color: "#1B5E20" },
  footerText: { textAlign: "center", color: "#666", fontSize: 14 },
  createAccountText: { color: "#2E7D32", fontWeight: "bold" },
});


export default Contact;
