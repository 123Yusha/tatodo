import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../configs/FirebaseConfig";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function Header() {
  const [username, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Fetch user's name from the 'users' collection
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
        <TextInput
          placeholder="Search for an event..."
          placeholderTextColor={"grey"}
          style={styles.inputBox}
          autoComplete="off"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(value) => console.log(value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: "#171616",
    margin: 10,
    textAlign: "center",
  },
  inputBox: {
    width: "80%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#171616",
    borderRadius: 8,
    marginBottom: 15,
  },
  inputContainer: {
    flex: 1, // Takes the remaining space
    alignItems: "center", // Horizontally centers the content
    width: "100%", // Full width of the screen
    padding: 10, // Additional space from the top
  },
});
