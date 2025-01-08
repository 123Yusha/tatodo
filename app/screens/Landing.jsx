import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Landing() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/tatodo-landing.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Welcome to <Text style={styles.boldText}>tatodo</Text>!
        </Text>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up all available space
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: "#171616",
    fontFamily: "outfit-regular",
    margin: 20,
    textAlign: "center",
  },
  boldText: {
    fontFamily: "outfit-bold",
  },
  image: {
    margin: 20,
  },
  button: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
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
