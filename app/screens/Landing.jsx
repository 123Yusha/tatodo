import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Landing() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/tatodo-landing.png")}
        style={styles.image}
      />
      <Text style={styles.text}>
        Welcome to <Text style={styles.boldText}>tatodo</Text>, Your hub to
        discover, join and share events in your local area!
      </Text>

      <Link href="/screens/sign-up" asChild>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        </Link>

      <Link href="/screens/sign-in" asChild>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full height of the screen
    justifyContent: "center",
    alignItems: "center", // Horizontally center the content
    backgroundColor: "#fff", // Optional background color
  },
  text: {
    fontSize: 20,
    color: "#171616",
    fontFamily: "outfit-regular",
    margin: 20,
    textAlign: "center", // Ensure the text is centered
    flexWrap: 'wrap', // Allow text to wrap if needed
  },
  boldText: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    margin: 20,
  },
  image: {
    margin: 20,
  },
  button: {
    backgroundColor: "#171616", // Match the text color from your theme
    paddingVertical: 15, // Vertical padding
    paddingHorizontal: 30, // Horizontal padding
    borderRadius: 18, // Rounded corners
    alignItems: "center", // Center the text
    justifyContent: "center", // Center the text
    marginTop: 20, // Add space above the button
    width: "80%", // Button width
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 3.5, // Shadow blur radius for iOS
  },
  buttonText: {
    fontSize: 18, // Font size
    color: "#fff", // White text color
    fontFamily: "outfit-regular", // Match your theme's font family
  },
});
