import { StyleSheet, Text, View, TextInput, Link, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";


export default function Header() {
  const [username, setUserName] = useState("");
  const router = useRouter();

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
      { username ? (<Text style={styles.headerText}>Welcome to TAtodo, {username}</Text>) : (<Text style={styles.headerText}> Welcome to TAtodo!</Text>) }
  
      <View style={styles.inputContainer}>
        { username ? (
        <Text style={styles.inputText}>Discover what's happening in your community! Explore events near you, register your interest, and even add them to your calendar. Hosting an event? Spread the word- all for free!</Text> ) : (<TouchableOpacity onPress={() => router.push("/screens/sign-in")}>
        <Text style={styles.linkText}>Sign in or sign up to use the full app features!</Text>
      </TouchableOpacity>)
      
        }
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

  linkText: {
    fontSize: 16,
    color: "#171616",
    fontFamily: "outfit-regular",
    textDecorationLine: "underline",
    alignItems: "center",
    marginTop: 10
  },
});
