import React from "react";
import {View,Text, StyleSheet,TextInput,TouchableOpacity,} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


const Contact = () => {
  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      {/* Formulaire */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        {/* Bouton de connexion */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Boutons avec logos */}
        <View style={styles.socialContainer}>
          {/* Bouton Google */}
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="google" size={24} color="#db4437" />
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </TouchableOpacity>

          {/* Bouton Facebook */}
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="facebook" size={24} color="#4267B2" />
            <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Lien pour créer un compte */}
        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text style={styles.createAccountText}>Create</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginVertical: 10,
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#FF5722",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialContainer: {
    marginVertical: 15,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  socialButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  footerText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
  createAccountText: {
    color: "#FF5722",
    fontWeight: "bold",
  },
});

export default Contact;