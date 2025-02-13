import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { signOut, deleteUser, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth, db } from "../../configs/FirebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";




export default function MyAccount() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("User logged out");
      router.replace("/");
    });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            if (user) {
              try {
                await deleteDoc(doc(db, "users", user.uid)); // delete firestore data
                await deleteUser(user); // delete auth user account
                console.log("User deleted successfully");
                router.replace("/");
              } catch (error) {
                console.error("Error deleting user:", error);
                Alert.alert(
                  "Error",
                  "Could not delete account. Please log in again and try."
                );
              }
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="#fff">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.headerText}>My account</Text>

        {user ? (
          <>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
              <Text style={styles.buttonText}>Delete account</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => router.push("/screens/sign-in")}>
          <Text style={styles.linkText}>
            Sign in or sign up to use the full app features!
          </Text>
          </TouchableOpacity>
          </View>
        )}
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
    alignItems: "center",
    flexGrow: 1,
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
  infoText: {
    fontSize: 18,
    color: "#555",
    fontFamily: "outfit-regular",
    textAlign: "center",
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    color: "#171616",
    fontFamily: "outfit-regular",
    textDecorationLine: "underline",
    alignItems: "center",
    marginTop: 10
  },
  inputContainer: {
    alignItems: "center",
    margin: 10,
  },
});
