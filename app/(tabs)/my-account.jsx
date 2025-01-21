import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, ScrollView } from "react-native";
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
    <SafeAreaView style={{ flex: 1 }} backgroundColor="#fff">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
         <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.container}
            >
       <Text style={styles.headerText}>My account</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  container: {
    padding: 10,
    alignItems: "center", // Horizontally center content inside the scroll view
    flexGrow: 1, // Ensures the content takes up available space
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: "#171616",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
