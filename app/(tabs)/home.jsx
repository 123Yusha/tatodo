import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
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
        const querySnapshot = await getDocs(
          query(
            collection(db, "User Post's"),
            orderBy("createdAt", "desc"),
            limit(3)
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
      <ScrollView contentContainerStyle={styles.container}>
        {/* ScrollView is wrapping all the content except the FlatList */}
        <Header />
        <Categories categoryList={categoryList} />
        <LatestEvents eventList={eventList} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 16, // Adding bottom padding to prevent cut-off at the bottom of the screen
  },
});
