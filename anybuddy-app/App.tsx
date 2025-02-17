import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; 
import Home from "./src/Component/Pages/Home";
import Contact from "./src/Component/Pages/Contact";
import Profil from "./src/Component/Pages/Profil";
import About from "./src/Component/Pages/About";
import Inscription from "./src/Component/Pages/Inscription";

export type RootTabParamList = {
  Home: undefined;
  "Mes résas": undefined;
  Profil: undefined;
  About: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Inscription: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Mes résas") iconName = "call-outline";
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

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Navigation principale (tabs) */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        {/* Écran caché, accessible uniquement via navigation */}
        <Stack.Screen name="Inscription" component={Inscription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
