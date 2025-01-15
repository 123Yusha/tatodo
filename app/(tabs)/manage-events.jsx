import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function ManageEvents() {

  const router = useRouter();

  const handlePostClick = () => {
    // Navigate to a different screen (for example, the "Post Event" screen)
    router.push("/screens/post-event")
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="#fff">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.headerText}>Manage your events</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handlePostClick}>
          <Text style={styles.buttonText}>Post a new event</Text>
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
    fontFamily: "outfit-regular",
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
