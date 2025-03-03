import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { db } from "../../configs/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import EventDetails from "./EventDetails";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function EventSignUp() {
  const { id, eventName, eventLocation } = useGlobalSearchParams(); // Get event ID from params
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [eventSignUps, setEventSignUps] = useState(0); // State for displaying count

  useEffect(() => {
    // Fetch current sign-ups
    const fetchEventData = async () => {
      try {
        const eventRef = doc(db, "UserPosts", id);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          const eventData = eventSnap.data();
          setEventSignUps(eventData.eventSignUps ?? 0); // Default to 0
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [id]);

  const handleSignUp = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const eventRef = doc(db, "UserPosts", id);
      const eventSnap = await getDoc(eventRef);

      if (eventSnap.exists()) {
        const eventData = eventSnap.data();
        const currentSignUps = eventData.eventSignUps || 0;

        await updateDoc(eventRef, {
          eventSignUps: currentSignUps + 1,
        });

        setEventSignUps(currentSignUps + 1); // Update UI immediately
        Alert.alert("Success", "You have signed up for the event!");
        router.back();
      } else {
        Alert.alert("Error", "Event not found.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert("Error", "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.backArrowContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons
            name="arrow-back"
            size={35}
            color="#171616"
        
          />
        </TouchableOpacity>
      </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>
              {eventName} at {eventLocation}{" "}
            </Text>
            <Text style={styles.bodyText}>
              Confirm your interest in attending this event by completing the
              sign up below. By signing up for this event, you're registering
              interest and giving the organisers a useful gauge of interest in
              the event! Please follow the event organisers guidance for
              ticketing purchases or event registration, if required.
            </Text>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Confirm Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 50 : 0, // Add space for the status bar and header on Android
  },
  contentContainer: {
    flex: 1,
    margin: 10,
    padding: 20,
  
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    marginBottom: 10,
    paddingTop: Platform.OS === "android" ? 70 : 20,
 
  },
  button: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    borderRadius: 18, // Smoother corners for buttons
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%", // Full width alignment
    elevation: 5, // Subtle shadow for button emphasis
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  bodyText: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    margin: 10,
  },
  backArrowContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? 20 : StatusBar.currentHeight || 40, // Adjust based on platform
    left: 20,
    zIndex: 10, // Ensure it stays above other components
  },
});
