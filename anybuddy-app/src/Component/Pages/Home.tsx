import React, { useState } from "react";
import { 
  View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

// Type de navigation
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "MainTabs">;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [search, setSearch] = useState("");
  
  const terrains = [
    {
      id: 1,
      name: "Five FC Paris - La Villette",
      image: require("../../Images/ParisFive18.jpg"),
      distance: "3,2 km",
    },
    {
      id: 2,
      name: "UrbanSoccer - Meudon",
      image: require("../../Images/Fivemeudon.jpg"),
      distance: "5,5 km",
    },
    {
      id: 3,
      name: "Five FC - Champigny",
      image: require("../../Images/FiveChampigny.webp"),
      distance: "7,0 km",
    },
    {
      id: 4,
      name: "Five FC - Ivry",
      image: require("../../Images/ParisIvry.webp"),
      distance: "8,3 km",
    }
  ];
  
  // Filtrer les terrains en fonction de la recherche
  const filteredTerrains = terrains.filter(terrain =>
    terrain.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bienvenue ! Un terrain vous tente ?</Text>
      
      {/* Barre de recherche */}
      <TextInput 
        style={styles.searchBar}
        placeholder="Rechercher un terrain..."
        value={search}
        onChangeText={setSearch}
      />
      
      {/* Boutons de filtre */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Créer un match</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Réserver un terrain</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Favoris ❤️</Text>
        </TouchableOpacity>
      </View>
      
      {/* Liste des terrains */}
      <View style={styles.grid}>
        {filteredTerrains.map((terrain) => (
          <TouchableOpacity
            key={terrain.id}
            onPress={() => navigation.navigate("TerrainDetails", { 
              terrain: { 
                ...terrain, 
                times: [] // ✅ Correction : Ajout de `times` pour éviter l'erreur TypeScript
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
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: "#f5f5f5", // ✅ Couleur plus sobre (gris clair)
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterText: { color: "#333", fontSize: 14, fontWeight: "bold" },
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
