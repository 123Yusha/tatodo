import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,  // Import ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useRouter,
  useGlobalSearchParams,
} from "expo-router";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function EventsByCategory() {
  const { categoryName } = useGlobalSearchParams(); // receive event name as a parameter from categories
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);  // Set loading state
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

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
        const querySnapshot = await getDocs(
          query(
            collection(db, "User Post's"),
            where("category", "==", categoryName),
            orderBy("createdAt", "desc")
          )
        );
        const events = [];
        querySnapshot.forEach((doc) => {
          console.log("ID:", doc.id, "DATA:", doc.data());
          events.push({ id: doc.id, ...doc.data() });
        });
        setEventList(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };
    fetchEvents();
  }, []);

  const handlePress = (item) => {
    const { id } = item;
    router.push({
      pathname: "/screens/EventDetails",
      params: { id },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="#fff">
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
      <View style={styles.container}>
        <Text style={styles.headerText}>{categoryName} events</Text>
        {loading ? (  // Show ActivityIndicator during loading
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={eventList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.eventItem}
                onPress={() => handlePress(item)}
              >
                <View style={styles.eventDetails}>
                  <Text style={styles.eventName}>{item.name}</Text>
                  <Text style={styles.eventDate}>{formatDate(item.date)}</Text>
                </View>
                <AntDesign name="arrowright" size={24} color="black" />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>
                No events found for this category.
              </Text>
            )}
          />
        )}
      </View>
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
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventDetails: {
    flex: 1,
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
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: "#888",
    marginTop: 20,
  },
});
