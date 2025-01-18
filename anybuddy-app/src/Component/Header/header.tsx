import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Anybuddy</Text>
      <View style={styles.navLinks}>
        <TouchableOpacity style={styles.navLink} onPress={() => console.log("Accueil")}>
          <Text style={styles.navText}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink} onPress={() => console.log("About")}>
          <Text style={styles.navText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink} onPress={() => console.log("Contact")}>
          <Text style={styles.navText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink} onPress={() => console.log("Profil")}>
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6200ea",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  navLinks: {
    flexDirection: "row",
  },
  navLink: {
    marginLeft: 15,
  },
  navText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Header;
