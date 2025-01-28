import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Header() {
  const [username, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserName(userDoc.data().name); // Set user's name from Firestore
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to tatodo, {username}!</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Discover what's happening in your community! Explore events near you, register your interest, and even add them to your calendar. Hosting an event? Spread the word- all for free!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#fff",
    marginBottom: 10, // Spacing below the Header
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: "#171616",
    marginHorizontal: 10,
    marginTop: 20,
    textAlign: "center",
  },
  inputContainer: {
    alignItems: "center",
    margin: 10,
  },
  inputText: {
    fontFamily: "outfit-regular",
    fontSize: 16,
    padding: 15,
  },
  inputBox: {
    width: "90%", // Take most of the screen width
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#171616",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
});
