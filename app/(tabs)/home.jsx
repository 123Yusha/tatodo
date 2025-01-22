import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/homescreen/Header";
import Categories from "../components/homescreen/Categories";
import LatestEvents from "../components/homescreen/LatestEvents";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const { height } = Dimensions.get("window");

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Category"));
        const categories = [];
        querySnapshot.forEach((doc) => {
          categories.push(doc.data());
        });
        setCategoryList(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Query to get the two newest posts, ordered by createdAt in descending order
        const querySnapshot = await getDocs(
          query(
            collection(db, "User Post's"),
            orderBy("createdAt", "desc"), // Order by the createdAt field in descending order
            limit(3) // Limit the result to only 3 posts
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Header />
        <Categories categoryList={categoryList} />
        {/* Keep FlatList inside LatestEvents */}
        <LatestEvents eventList={eventList} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
