import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>À propos d'Anybuddy</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Comment réserver un terrain ?</Text>
        <Text style={styles.text}>
          Avec Anybuddy, réserver un terrain est simple et rapide. Voici les étapes à suivre :
        </Text>
        <View style={styles.steps}>
          <Text style={styles.step}>
            1. **Téléchargez l'application** : Anybuddy est disponible sur iOS et Android.
          </Text>
          <Text style={styles.step}>
            2. **Créez un compte** : Inscrivez-vous avec votre adresse e-mail ou via Facebook/Google.
          </Text>
          <Text style={styles.step}>
            3. **Recherchez un terrain** : Utilisez notre moteur de recherche pour trouver un terrain disponible près de chez vous.
          </Text>
          <Text style={styles.step}>
            4. **Choisissez un créneau horaire** : Sélectionnez l'heure qui vous convient le mieux et consultez les prix.
          </Text>
          <Text style={styles.step}>
            5. **Réservez et payez en ligne** : Finalisez votre réservation directement dans l'application.
          </Text>
          <Text style={styles.step}>
            6. **Profitez de votre partie** : Rendez-vous au terrain réservé et amusez-vous avec vos amis !
          </Text>
        </View>
        <Text style={styles.note}>
          *Pas besoin d'abonnement, vous ne payez que pour le terrain que vous réservez.*
        </Text>
        <Text style={styles.subtitle}>Pourquoi choisir Anybuddy ?</Text>
        <Text style={styles.text}>
          Anybuddy simplifie la réservation de terrains pour des sports comme le football, le tennis, le padel, et bien d'autres :
        </Text>
        <View style={styles.benefits}>
          <Text style={styles.benefit}>✓ Accès à un large réseau de terrains partenaires.</Text>
          <Text style={styles.benefit}>✓ Tarifs compétitifs et sans engagement.</Text>
          <Text style={styles.benefit}>✓ Réservation simple en quelques clics.</Text>
          <Text style={styles.benefit}>✓ Support client réactif et disponible.</Text>
        </View>
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6200ea",
    textAlign: "center",
  },
  content: {
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  steps: {
    marginTop: 10,
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
    color: "#555",
  },
  note: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#888",
  },
  benefits: {
    marginTop: 10,
  },
  benefit: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
    color: "#555",
  },
});

export default About;