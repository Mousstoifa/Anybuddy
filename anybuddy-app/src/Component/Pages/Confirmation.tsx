import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App"; 

type ConfirmationRouteProp = RouteProp<RootStackParamList, "Confirmation">;
type ConfirmationNavigationProp = StackNavigationProp<RootStackParamList, "Confirmation">;

const Confirmation = () => {
  const route = useRoute<ConfirmationRouteProp>(); 
  const navigation = useNavigation<ConfirmationNavigationProp>(); 

  // ✅ Vérification si les paramètres existent
  if (!route.params) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erreur : Aucune donnée de réservation trouvée.</Text>
      </View>
    );
  }

  const { terrain, date, time } = route.params;

  return (
    <View style={styles.container}>
      <Image source={terrain.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>Réservation confirmée ! 🎉</Text>
      <Text style={styles.info}>📍 {terrain.name}</Text>
      <Text style={styles.info}>📅 {date}</Text>
      <Text style={styles.info}>🕒 {time}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MainTabs")}>
        <Text style={styles.buttonText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#E8F5E9", justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 200, marginBottom: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#1B5E20" },
  info: { fontSize: 16, color: "#2E7D32", marginBottom: 10 },
  button: { backgroundColor: "#1B5E20", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 18, textAlign: "center", marginTop: 20 },
});


export default Confirmation;
