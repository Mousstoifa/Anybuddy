import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

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

  // États pour la date et les heures
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedTimeStart, setSelectedTimeStart] = useState(new Date());
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);

  const [selectedTimeEnd, setSelectedTimeEnd] = useState(new Date());
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);

  const [terrainType, setTerrainType] = useState("Five extérieur");

  // ✅ Fonction de validation avant réservation
  const handleReservation = () => {
    if (!selectedDate || !selectedTimeStart || !selectedTimeEnd || !terrainType) {
      Alert.alert("Erreur", "Veuillez sélectionner une date, une heure de début, une heure de fin et un type de terrain.");
      return;
    }

    navigation.navigate("Confirmation", {
      terrain,
      date: selectedDate.toDateString(),
      time: `${selectedTimeStart.getHours()}:${selectedTimeStart.getMinutes()} - ${selectedTimeEnd.getHours()}:${selectedTimeEnd.getMinutes()}`,
      terrainType,
    });
  };

  return (
    <View style={styles.container}>
      {/* 🖼 Image du terrain */}
      <View style={styles.imageContainer}>
        <Image source={terrain.image} style={styles.image} resizeMode="cover" />
      </View>

      {/* 📌 Infos du terrain */}
      <Text style={styles.title}>{terrain.name}</Text>
      <Text style={styles.distance}>📍 {terrain.distance}</Text>

      {/* 🔹 Type de terrain */}
      <Text style={styles.label}>Type de terrain :</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={terrainType} onValueChange={(value) => setTerrainType(value)}>
          <Picker.Item label="Five extérieur" value="Five extérieur" />
          <Picker.Item label="Five intérieur" value="Five intérieur" />
          <Picker.Item label="Terrain à 7" value="Terrain à 7" />
        </Picker>
      </View>

      {/* 📅 Sélection de la Date */}
      <Text style={styles.label}>Date de réservation :</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={styles.inputText}>{selectedDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"
          onChange={(event, selected) => {
            setShowDatePicker(false);
            if (selected) setSelectedDate(selected);
          }}
        />
      )}

      {/* ⏳ Sélection Heure de Début */}
      <Text style={styles.label}>Heure de début :</Text>
      <TouchableOpacity onPress={() => setShowTimeStartPicker(true)} style={styles.input}>
        <Text style={styles.inputText}>{`${selectedTimeStart.getHours()}:${selectedTimeStart.getMinutes()}`}</Text>
      </TouchableOpacity>

      {showTimeStartPicker && (
        <DateTimePicker
          value={selectedTimeStart}
          mode="time"
          display="spinner"
          onChange={(event, selected) => {
            setShowTimeStartPicker(false);
            if (selected) setSelectedTimeStart(selected);
          }}
        />
      )}

      {/* ⏳ Sélection Heure de Fin */}
      <Text style={styles.label}>Heure de fin :</Text>
      <TouchableOpacity onPress={() => setShowTimeEndPicker(true)} style={styles.input}>
        <Text style={styles.inputText}>{`${selectedTimeEnd.getHours()}:${selectedTimeEnd.getMinutes()}`}</Text>
      </TouchableOpacity>

      {showTimeEndPicker && (
        <DateTimePicker
          value={selectedTimeEnd}
          mode="time"
          display="spinner"
          onChange={(event, selected) => {
            setShowTimeEndPicker(false);
            if (selected) setSelectedTimeEnd(selected);
          }}
        />
      )}

      {/* ✅ Bouton de Confirmation */}
      <TouchableOpacity style={styles.button} onPress={handleReservation}>
        <Text style={styles.buttonText}>Confirmer la réservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", alignItems: "center" },

  imageContainer: { width: "100%", height: 220, borderRadius: 10, overflow: "hidden", marginBottom: 15 },
  image: { width: "100%", height: "100%" },

  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  distance: { fontSize: 16, color: "#666", marginBottom: 15, textAlign: "center" },

  label: { fontSize: 16, fontWeight: "bold", marginTop: 10, textAlign: "center" },

  input: {
    width: "85%",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    alignItems: "center",
    height: 50,  
    justifyContent: "center",
  },

  inputText: { fontSize: 16, color: "#333" },

  pickerContainer: {
    width: "85%",
    height: 50,  
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    justifyContent: "center",
  },

  button: { 
    backgroundColor: "#FF5722", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 10, 
    width: "85%",  
    height: 50,  
    justifyContent: "center",
  },
  
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  errorText: { color: "red", fontSize: 18, textAlign: "center", marginTop: 20 },
});

export default TerrainDetails;
