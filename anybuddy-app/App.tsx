import React from "react";
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { registerRootComponent } from "expo";

import Home from "./src/Component/Pages/Home";
import Contact from "./src/Component/Pages/Contact";
import Profil from "./src/Component/Pages/Profil";
import About from "./src/Component/Pages/About";
import Inscription from "./src/Component/Pages/Inscription";
import TerrainDetails from "./src/Component/Pages/TerrainDetails";
import Confirmation from "./src/Component/Pages/Confirmation";

// 🔹 Types pour la navigation
export type RootTabParamList = {
  Home: undefined;
  "Mes résas": undefined;
  Profil: undefined;
  About: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Inscription: undefined;
  TerrainDetails: { 
    terrain: { 
      id: number; 
      name: string; 
      image: any; 
      distance: string; 
      times: { time: string; price: string }[] 
    };
  };
  Confirmation: { 
    terrain: { id: number; name: string; image: any; distance: string }; 
    date: string; 
    time: string ;
    terrainType: string; 
  };
};

// Création des navigateurs
const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// 🔹 Navigation des onglets
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Mes résas") iconName = "calendar-outline";
          else if (route.name === "Profil") iconName = "person-outline";
          else if (route.name === "About") iconName = "information-circle-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6200ea",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Mes résas" component={Contact} />
      <Tab.Screen name="Profil" component={Profil} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};

// 🔹 Navigation principale avec Stack
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="TerrainDetails" component={TerrainDetails} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 🔹 Enregistrement de l'application Expo
registerRootComponent(App);

export default App;
