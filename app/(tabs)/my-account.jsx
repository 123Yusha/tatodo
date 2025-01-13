import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../../configs/FirebaseConfig";

export default function MyAccount() {

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("User logged out");
      router.replace("/"); // Redirect to the landing page or login screen
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textContainer: {
    marginBottom: 40, // Provides spacing between text and buttons
  },
  text: {
    fontSize: 20,
    color: "#171616",
    fontFamily: "outfit-regular",
    textAlign: "center",
    margin: 10,
  },
  boldText: {
    fontFamily: "outfit-bold",
  },
  image: {
    marginBottom: 20, // Space between the image and the text
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%", // Ensures the buttons take full width
  },
  button: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // Adds spacing between buttons
    width: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "outfit-regular",
  },
});
