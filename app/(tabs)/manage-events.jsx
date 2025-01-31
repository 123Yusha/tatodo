import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  useRouter,
} from "expo-router";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getAuth } from "firebase/auth";

export default function ManageEvents() {
  const router = useRouter();
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.error("No user is currently logged in.");
          return;
        }

        const userEmail = currentUser.email;

        const eventsQuery = query(
          collection(db, "User Post's"),
          orderBy("createdAt", "desc"),
          where("userEmail", "==", userEmail)
        );

        const querySnapshot = await getDocs(eventsQuery);
        const userEvents = [];
        querySnapshot.forEach((doc) => {
          userEvents.push({ id: doc.id, ...doc.data() });
        });

        setEventList(userEvents);
      } catch (error) {
        console.error("Error fetching user events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

  const handlePostClick = () => {
    router.push("/screens/post-event");
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

  const renderEventItem = ({ item }) => (
    <TouchableOpacity style={styles.eventItem} activeOpacity={0.7} onPress={() => handlePress(item)}>
      <View style={styles.eventDetails}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDate}>{formatDate(item.date)}</Text>
      </View>
      <AntDesign name="arrowright" size={24} color="black" />
    </TouchableOpacity>
  );

  const handlePress = (item) => {
    const { id } = item;
    router.push({
      pathname: "/screens/EventDetailsDelete",
      params: { id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text style={styles.headerText}>Manage your events</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handlePostClick}
        >
          <Text style={styles.buttonText}>Post a new event</Text>
        </TouchableOpacity>
        <Text style={styles.subHeadText}>Your hosted events</Text>
        
        {/* Show loading indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : eventList.length > 0 ? (
          <FlatList
            data={eventList}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.noEventsText}>You haven't posted any events yet.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: "#171616",
    textAlign: "center",
    marginBottom: 20,
  },
  subHeadText: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    marginBottom: 20,
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
  loadingIndicator: {
    marginTop: 20,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  noEventsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  listContainer: {
    paddingBottom: 20,
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f8f8f8",
    marginVertical: 8,
    borderRadius: 8,
    elevation: 1,
  },
  eventDetails: {
    flex: 1,
    marginRight: 10,
  },
  eventName: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: "#171616",
  },
  eventDate: {
    fontSize: 14,
    fontFamily: "outfit-regular",
    color: "#555",
  },
});
