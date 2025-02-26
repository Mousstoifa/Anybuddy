import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App"; // ✅ Import des types

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "MainTabs">;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const terrains = [
    {
      id: 1,
      name: "Five FC Paris - La Villette",
      image: require("../../Images/ParisFive18.jpg"),
      distance: "3,2 km",
      address: "5 Rue de la Villette, 75019 Paris",
    },
    {
      id: 2,
      name: "UrbanSoccer - Meudon",
      image: require("../../Images/Fivemeudon.jpg"),
      distance: "5,5 km",
      address: "Chemin du Tronchet, 92360 Meudon",
    },
    {
      id: 3,
      name: "Five FC - Champigny",
      image: require("../../Images/FiveChampigny.webp"),
      distance: "7,0 km",
      address: "1 Rue du Marché Rollay, 94500 Champigny-sur-Marne",
    },
    {
      id: 4,
      name: "Five FC - Ivry",
      image: require("../../Images/ParisIvry.webp"),
      distance: "8,3 km",
      address: "2 Rue de la Baignade, 94200 Ivry-sur-Seine",
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bienvenue ! Un terrain vous tente ?</Text>
      <View style={styles.grid}>
        {terrains.map((terrain) => (
          <TouchableOpacity
            key={terrain.id}
            onPress={() => navigation.navigate("TerrainDetails", { 
              terrain: { 
                ...terrain, 
                times: [] // ✅ Correction : Ajout de times pour éviter l'erreur
              } 
            })}
          >
            <View style={styles.terrain}>
              <Image source={terrain.image} style={styles.image} resizeMode="cover" />
              <View style={styles.details}>
                <Text style={styles.name}>{terrain.name}</Text>
                <Text style={styles.distance}>📍 {terrain.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  grid: { flexDirection: "column", gap: 15 },
  terrain: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: { width: "100%", height: 150 },
  details: { padding: 10 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  distance: { fontSize: 14, color: "#666", marginBottom: 10 },
});

export default Home;
