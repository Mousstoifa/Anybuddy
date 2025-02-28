import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, Alert, FlatList
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import dayjs from "dayjs"; // 📌 Pour le formatage de date/heure

// ✅ Définition du type pour une réservation
type ReservationType = {
  idreservation: number;
  horaire: string; // ISO String "2024-03-01T09:00:00"
  duree: string;   // "03:00:00"
  prix: string;
  idDisponibilite: number;
};

// ✅ Types pour la navigation
type TerrainDetailsRouteProp = RouteProp<RootStackParamList, "TerrainDetails">;
type TerrainDetailsNavigationProp = StackNavigationProp<RootStackParamList, "TerrainDetails">;

const TerrainDetails = () => {
  const route = useRoute<TerrainDetailsRouteProp>();
  const navigation = useNavigation<TerrainDetailsNavigationProp>();

  if (!route.params) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erreur : Aucune donnée de terrain trouvée.</Text>
      </View>
    );
  }

  const { terrain } = route.params;

  // ✅ États
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<ReservationType | null>(null);

  // ✅ Récupération des réservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://192.168.1.14:5000/api/reservations/terrain/${terrain.id}`);
        const data: ReservationType[] = await response.json();

        if (Array.isArray(data)) {
          setReservations(data);
        } else {
          console.error("Données invalides reçues :", data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
      }
    };

    fetchReservations();
  }, [terrain.id]);

  // ✅ Sélection d’un créneau
  const handleSelectReservation = (reservation: ReservationType) => {
    setSelectedReservation(reservation);
  };

  // ✅ Confirmation de réservation
  const handleConfirm = () => {
    if (!selectedReservation) {
      Alert.alert("Erreur", "Veuillez sélectionner un créneau.");
      return;
    }

    navigation.navigate("Confirmation", {
      terrain,
      date: formatHoraire(selectedReservation.horaire), // ✅ Date formatée
      time: formatDuree(selectedReservation.duree), // ✅ Durée formatée
      terrainType: "Five extérieur",
    });
  };

  // ✅ Formatage de la date et de l'heure
  const formatHoraire = (isoString: string) => {
    const date = dayjs(isoString);
    return `${date.format("DD/MM/YYYY")} à ${date.format("HH:mm")}`;
  };

  // ✅ Formatage de la durée
  const formatDuree = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
  };

  return (
    <View style={styles.container}>
      {/* 🖼 Image du terrain */}
      <Image source={terrain.image} style={styles.image} resizeMode="cover" />

      {/* 📌 Infos du terrain */}
      <Text style={styles.title}>{terrain.name}</Text>
      <Text style={styles.distance}>📍 {terrain.distance}</Text>

      {/* 🔹 Sélection des créneaux */}
      <Text style={styles.label}>Sélectionnez un créneau :</Text>

      {reservations.length > 0 ? (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.idreservation.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.reservationItem,
                selectedReservation?.idreservation === item.idreservation && styles.selectedReservation
              ]}
              onPress={() => handleSelectReservation(item)}
            >
              <Text>⏰ {formatHoraire(item.horaire)} | ⏳ {formatDuree(item.duree)} | 💰 {item.prix}€</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noData}>Aucun créneau disponible</Text>
      )}

      {/* ✅ Bouton de Confirmation (remonté visuellement) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirmer la réservation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#E8F5E9", alignItems: "center" },

  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 15 },

  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 5, color: "#1B5E20" },
  distance: { fontSize: 16, color: "#388E3C", marginBottom: 15, textAlign: "center" },

  label: { fontSize: 16, fontWeight: "bold", marginTop: 10, textAlign: "center", color: "#2E7D32" },

  reservationItem: {
    width: "100%",
    padding: 15,
    backgroundColor: "#C8E6C9",
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
  },

  selectedReservation: { backgroundColor: "#1B5E20", color: "#fff" },

  noData: { color: "#999", fontSize: 16, marginTop: 20 },

  buttonContainer: { 
    position: "absolute", 
    bottom: 20, 
    width: "100%", 
    alignItems: "center"
  },

  button: { 
    backgroundColor: "#1B5E20",  
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center", 
    width: "85%",  
    height: 50,  
    justifyContent: "center",
  },

  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  errorText: { color: "red", fontSize: 18, textAlign: "center", marginTop: 20 },
});

export default TerrainDetails;
