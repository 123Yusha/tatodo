import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { app } from "../../configs/FirebaseConfig";
import { getFirestore, getDocs, collection } from "firebase/firestore";

export default function PostEvent() {
  const router = useRouter();
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
      if (querySnapshot.empty) {
        console.log("No documents found.");

      } else {
        querySnapshot.forEach((doc) => {
          console.log("Docs:", doc.data());
          setCategoryList(categoryList=>[...categoryList, doc.data])
        });
      }
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.container}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backArrow}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },

  backArrow: {
    margin: 20,
    position: "absolute", // Keeps it fixed in place
    top: 10,
    left: 10,
  },
});
