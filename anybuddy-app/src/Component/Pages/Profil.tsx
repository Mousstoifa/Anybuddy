import React from "react";
import { View, Text, StyleSheet, Image, Button, ScrollView } from "react-native";

const Profil = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon profil</Text>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>Mousstoifa Aboudou</Text>
          <Text style={styles.memberSince}>Membre depuis janvier 2025</Text>
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.detailValue}>0</Text>
              <Text style={styles.detailLabel}>Match joué</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailValue}>Non défini</Text>
              <Text style={styles.detailLabel}>Sport le plus joué</Text>
            </View>
          </View>
          <Button title="Modifier mon profil" onPress={() => {}} />
        </View>
      </View>
      <View style={styles.statistics}>
        <Text style={styles.statsTitle}>Statistiques</Text>
        <View style={styles.statsGrid}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>0%</Text>
            <Text style={styles.statLabel}>Taux de victoire</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Victoire</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Défaite</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Partenaires avec qui tu as joué : 0</Text>
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
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    marginBottom: 15,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  info: {
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  memberSince: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  detailItem: {
    alignItems: "center",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
  },
  statistics: {
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
});

export default Profil;
