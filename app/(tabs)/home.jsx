import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(true);

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
            collection(db, "UserPosts"),
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
     finally {
      setLoading(false); 
    }
    };
    
    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            <Header />
            <Categories categoryList={categoryList} />
            <LatestEvents eventList={eventList} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 16, 
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height - 100,
  },
});
