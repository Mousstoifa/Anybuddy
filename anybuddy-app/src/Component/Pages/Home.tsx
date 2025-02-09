import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import ParisFiveImage from "../../Images/ParisFive18.jpg";
import FivemeudonImage from "../../Images/Fivemeudon.jpg";

const Home = () => {
  const terrains = [
    {
      id: 1,
      name: "Five FC Paris - La Villette",
      image: ParisFiveImage, // Image locale
      distance: "3,2 km",
      times: [
        { time: "17h00", price: "45 €" },
        { time: "18h30", price: "50 €" },
        { time: "20h00", price: "55 €" },
      ],
    },
    {
      id: 2,
      name: "UrbanSoccer - Meudon",
      image: FivemeudonImage, // Image locale
      distance: "5,5 km",
      times: [
        { time: "16h00", price: "40 €" },
        { time: "18h00", price: "45 €" },
        { time: "19h30", price: "50 €" },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bienvenue ! Un terrain vous tente ?</Text>
      <View style={styles.grid}>
        {terrains.map((terrain) => (
          <View style={styles.terrain} key={terrain.id}>
            <Image
              source={terrain.image} // Utilisation correcte de `terrain.image`
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.details}>
              <Text style={styles.name}>{terrain.name}</Text>
              <Text style={styles.distance}>📍 {terrain.distance}</Text>
              <View style={styles.times}>
                {terrain.times.map((slot, index) => (
                  <Text style={styles.time} key={index}>
                    {slot.time} - {slot.price}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "column",
    gap: 15,
  },
  terrain: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 2, // Pour l'ombre sous Android
    shadowColor: "#000", // Pour l'ombre sous iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 150,
  },
  details: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  distance: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  times: {
    flexDirection: "column",
    gap: 5,
  },
  time: {
    fontSize: 14,
    color: "#333",
  },
});

export default Home;
