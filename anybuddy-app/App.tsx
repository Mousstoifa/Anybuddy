import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Assurez-vous que ce package est installé
import Home from "./src/Component/Pages/Home";
import Contact from "./src/Component/Pages/Contact";
import Profil from "./src/Component/Pages/Profil";
import About from "./src/Component/Pages/About";

// Définition des types des routes
type RootTabParamList = {
  Home: undefined;
  Contact: undefined;
  Profil: undefined;
  About: undefined;
};

// Initialisation du menu en bas
const Tab = createBottomTabNavigator<RootTabParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            // Déclarez et affectez `iconName` avec une valeur par défaut
            let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Contact") {
              iconName = "call-outline";
            } else if (route.name === "Profil") {
              iconName = "person-outline";
            } else if (route.name === "About") {
              iconName = "information-circle-outline";
            }

            // Retourne une icône Ionicons
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#6200ea", // Couleur active
          tabBarInactiveTintColor: "gray", // Couleur inactive
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Contact" component={Contact} />
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Profil" component={Profil} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
