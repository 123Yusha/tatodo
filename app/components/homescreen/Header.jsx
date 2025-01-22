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
    paddingVertical: 16,
    backgroundColor: "#fff",
    marginBottom: 10, // Spacing below the Header
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: "#171616",
    marginBottom: 12, // Spacing between the text and input
    textAlign: "center",
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
  },
  inputBox: {
    width: "90%", // Take most of the screen width
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#171616",
    borderRadius: 8,
  },
});
