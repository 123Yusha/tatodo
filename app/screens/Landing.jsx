import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar
} from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Landing() {
  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="#fff">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/tatodo-landing.png")}
          style={styles.image}
        />

        {/* Text container */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Welcome to <Text style={styles.boldText}>tatodo</Text>!
          </Text>
          <Text style={styles.text}>Sign in or Sign up to use the app.</Text>
        </View>

        {/* Button container */}
        <View style={styles.buttonContainer}>
          <Link href="/screens/sign-up" asChild>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/screens/sign-in" asChild>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </Link>
        </View>
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
    margin: 10
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
