import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function BrowseEvents() {
  const [eventList, setEventList] = useState([]);

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Query to get the two posts, ordered by createdAt in descending order
        const querySnapshot = await getDocs(
          query(
            collection(db, "User Post's"),
            orderBy("createdAt", "desc") // Order by the createdAt field in descending order
          )
        );
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() });
        });
        setEventList(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>All events</Text>
        </View>
        <FlatList
          data={eventList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.eventItem}>
              <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventDate}>{formatDate(item.date)}</Text>
                <AntDesign name="arrowright" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#fff",
  
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: "#171616",
    marginVertical: 10,
    textAlign: "center",
  },
  subHeadText: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    marginBottom: 16,
    textAlign: "center",
  },
  eventItem: {
    flexDirection: "row", // Row layout for event name and arrow
    alignItems: "center", // Vertically center the content
    justifyContent: "space-between", // Spread items out (event details on the left, arrow on the right)
    padding: 12,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
  },
  eventDetails: {
    flex: 1, // Take available space, pushing arrow to the right
  },
  eventName: {
    fontSize: 16,
    fontFamily: "outfit-regular",
  },
  eventDate: {
    fontSize: 14,
    fontFamily: "outfit-regular",
    color: "#555",
  },
  arrowIcon: {
    margin: 10, // Space between event details and arrow
  },

  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
