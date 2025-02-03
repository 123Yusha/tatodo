import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Calendar from "expo-calendar";
import { useFocusEffect } from "expo-router";
import { auth } from "../../configs/FirebaseConfig";

export default function EventDetails() {
  const { id } = useGlobalSearchParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [hasSignedUp, setHasSignedUp] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchEventDetails = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "User Post's", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setEventDetails(docSnap.data()); // Set event data
            const user = auth.currentUser;
            if (user) {
              const signUpRef = collection(db, "User Post's", id, "signups");
              const q = query(signUpRef, where("userEmail", "==", user.email)); // Query by userEmail
              const querySnapshot = await getDocs(q);

              setHasSignedUp(!querySnapshot.empty); // Persisted across navigation
            }
          } else {
            setError("Event not found.");
          }
        } catch (err) {
          setError("Error fetching event details.");
        } finally {
          setLoading(false);
        }
      };

      fetchEventDetails();

      return () => {
        setEventDetails(null);
        setLoading(true);
        setError(null);
      };
    }, [id])
  );

  const handleBack = () => {
    router.back();
  };

  const eventSignUpNav = async () => {
    if (!hasSignedUp) {
      try {
        const user = auth.currentUser;
        if (!user) {
          alert("Please sign in first.");
          return;
        }

        // Store the sign-up in Firestore using userEmail
        const signUpRef = doc(db, "User Post's", id, "signups", user.email); // Use email as document ID
        await setDoc(signUpRef, { userEmail: user.email, timestamp: new Date() });

        setHasSignedUp(true); // Now persists even after navigating away
        router.push({ pathname: "/screens/EventSignUp", params: { id, eventName: eventDetails.name, eventLocation: eventDetails.location } });
      } catch (error) {
        console.error("Error signing up:", error);
        alert("Failed to sign up.");
      }
    }
  };

  const formatDate = (date) => {
    if (date.toDate) {
      date = date.toDate(); // Ensure date is a valid Date object
    }
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "Invalid date";
  };

  const addEventToCalendar = async () => {
    try {
      const { status: calendarStatus } = await Calendar.requestCalendarPermissionsAsync();
      let remindersStatus = 'granted';
  
      // Request reminders permissions only on iOS
      if (Platform.OS === 'ios') {
        const { status: reminderPermission } = await Calendar.requestRemindersPermissionsAsync();
        remindersStatus = reminderPermission;
      }
  
      if (calendarStatus !== "granted" || remindersStatus !== "granted") {
        alert("Both Calendar and Reminders permissions are required.");
        return;
      }
  
      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendar = calendars.find(
        (cal) => cal.isPrimary || cal.allowsModifications
      );
  
      if (!defaultCalendar) {
        alert("No suitable calendar found.");
        return;
      }
  
      const startDate = eventDetails?.date?.toDate
        ? eventDetails.date.toDate()
        : new Date();
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Default 1-hour duration
  
      const eventDetailsForCalendar = {
        title: eventDetails.name,
        startDate,
        endDate,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Adjust to your timezone
        location: eventDetails.location,
      };
  
      await Calendar.createEventAsync(defaultCalendar.id, eventDetailsForCalendar);
      Alert.alert("Event added!", "Edit your device calendar to modify.", [
        { text: "OK", style: "default" },
      ]);
    } catch (error) {
      console.error("Error adding event to calendar:", error);
      alert("Failed to add event to calendar.");
    }
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.backArrowContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={35} color="#171616" />
        </TouchableOpacity>
      </View>
      {eventDetails && (
        <ScrollView style={styles.eventDetails}>
          <Text style={styles.eventName}>{eventDetails.name}</Text>
          <Text style={styles.eventLocation}>
            Where: {eventDetails.location}
          </Text>
          <Text style={styles.eventDate}>
            When: {formatDate(eventDetails.date)}
          </Text>
          <Text style={styles.eventCategory}>
            Category: {eventDetails.category}
          </Text>
          <Text style={styles.eventCategory}>
            {(eventDetails.eventSignUps ?? 0) === 1
              ? `Interested: ${eventDetails.eventSignUps ?? 0} person`
              : `Interested: ${eventDetails.eventSignUps ?? 0} people`}
          </Text>
          <Text style={styles.subHeadDescription}>Description</Text>
          <Text style={styles.eventDescription}>
            {eventDetails.description}
          </Text>

          <TouchableOpacity
            style={[styles.button, hasSignedUp && styles.buttonDisabled]} // Change style if already signed up
            activeOpacity={0.7}
            onPress={eventSignUpNav}
            disabled={hasSignedUp} // Disable button after signing up
          >
            <Text style={styles.buttonText}>
              {hasSignedUp ? "You've signed up!" : "Sign up"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={addEventToCalendar}
          >
            <Text style={styles.buttonText}>Add to calendar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 50 : 0, // Add space for the status bar and header on Android
  },
  backArrowContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? 20 : StatusBar.currentHeight || 40, // Adjust based on platform
    left: 20,
    zIndex: 10, // Ensure the back button stays above other elements
  },
  eventDetails: {
    flex: 1,
    margin: 10,
    padding: 20,
    paddingTop: Platform.OS === "android" ? 70 : 20, // Adjust padding for Android to prevent overlap
  },
  eventName: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    marginBottom: 10,
  },
  eventCategory: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    marginBottom: 10,
    color: "#555",
  },
  eventDescription: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    marginBottom: 10,
  },
  eventLocation: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: "#555",
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: "#555",
    marginBottom: 10,
  },
  subHeadDescription: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: "#555",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  buttonDisabled: {
    backgroundColor: "#4CAF50", // Change the color to indicate disabled
    fontSize: 18,
    color: "#fff",
  },
});
