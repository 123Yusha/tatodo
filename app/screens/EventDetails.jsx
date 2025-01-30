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
} from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Calendar from "expo-calendar";
import { useFocusEffect } from "expo-router";

export default function EventDetails() {
  const { id } = useGlobalSearchParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [hasSignedUp, setHasSignedUp] = useState(false);

  // Used `useFocusEffect` wrapped in `useCallback` to re-fetch event data**
  useFocusEffect(
    useCallback(() => {
      const fetchEventDetails = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "User Post's", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setEventDetails(docSnap.data()); // Set event data
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

      // Return function for cleanup when unfocused
      return () => {
        setEventDetails(null); // Clear event details on unfocus (optional)
        setLoading(true); // Reset loading state
        setError(null); // Reset error state
      };
    }, [id]) // Dependency array to re-fetch only if the `id` changes
  );

  const handleBack = () => {
    router.back();
  };

  const eventSignUpNav = () => {
    if (!hasSignedUp) {
      setHasSignedUp(true); // Mark as signed up
      router.push({
        pathname: "/screens/EventSignUp",
        params: {
          id,
          eventName: eventDetails.name,
          eventLocation: eventDetails.location,
        },
      }); // Navigate to the EventSignUp screen
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
      const { status: calendarStatus } =
        await Calendar.requestCalendarPermissionsAsync();
      const { status: remindersStatus } =
        await Calendar.requestRemindersPermissionsAsync();

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

      await Calendar.createEventAsync(
        defaultCalendar.id,
        eventDetailsForCalendar
      );
      Alert.alert("Event added!", "Edit your device calendar to modify.", [
        { text: "OK", style: "default" },
      ]);
    } catch (error) {
      console.error("Error adding event to calendar:", error);
      alert("Failed to add event to calendar.");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
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
  },
  backArrowContainer: {
    position: "absolute",
    top: StatusBar.currentHeight || 40, // Adjust for status bar height
    left: 20,
    zIndex: 10, // Ensure it stays above other components
  },
  eventDetails: {
    flex: 1,
    margin: 10,
    padding: 20,
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
