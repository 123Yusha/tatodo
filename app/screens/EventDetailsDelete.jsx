import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function EventDetails() {
  const { id } = useGlobalSearchParams(); // Receive the event id as a param
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Go back to the previous screen
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
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
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const handleDeleteEvent = async () => {
    try {
      const docRef = doc(db, "User Post's", id);
      await deleteDoc(docRef); // Delete the event

      // Show success alert
      Alert.alert("Success", "Event deleted successfully.", [
        {
          text: "OK",
          onPress: () => router.push("manage-events"), // Optionally, navigate back after delete
        },
      ]);
    } catch (err) {
      // Handle any error
      Alert.alert("Error", "There was an issue deleting the event.");
    }
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
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>
      {eventDetails && (
        <ScrollView style={styles.eventDetails}>
          <Text style={styles.eventName}>{eventDetails.name}- ORGANISER!!!</Text>
          <Text style={styles.eventLocation}>
            Where: {eventDetails.location}
          </Text>
          <Text style={styles.eventDate}>
            When: {formatDate(eventDetails.date)}
          </Text>
          <Text style={styles.eventCategory}>
            Category: {eventDetails.category}
          </Text>
          <Text style={styles.eventDescription}>
            {eventDetails.description}
          </Text>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleDeleteEvent}>
            <Text style={styles.buttonText}>Delete event</Text>
          </TouchableOpacity>
         
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const formatDate = (date) => {
  if (date.toDate) {
    date = date.toDate();
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
});
