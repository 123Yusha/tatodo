import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/homescreen/Header";
import Categories from "../components/homescreen/Categories";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);

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
        Alert.alert("Error", "Unable to load categories. Please try again.");
      }
    };
    fetchCategories();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}
        style={styles.container}
      >
        <View style={styles.container}>
          <Header />
          <Categories categoryList={categoryList} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
  },
});
