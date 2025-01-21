import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


const { width } = Dimensions.get("window"); // Get device width for responsive design

const getIcon = (name) => {
  if (name === "Music") return <FontAwesome name="music" size={32} color="black" />;
  if (name === "Educational") return <FontAwesome6 name="book-open-reader" size={24} color="black" />
  if (name === "Nightlife") return <MaterialCommunityIcons name="party-popper" size={24} color="black" />
  if (name === "Seasonal") return <FontAwesome name="tree" size={24} color="black" />;
  if (name === "Business") return <FontAwesome6 name="business-time" size={24} color="black" />;
  if (name === "Sports") return <FontAwesome name="soccer-ball-o" size={24} color="black" />
  if (name === "Family & Kids") return <MaterialIcons name="family-restroom" size={24} color="black" />;
  if (name === "Markets & Fairs") return <FontAwesome5 name="store" size={24} color="black" />
  if (name === "Arts") return <FontAwesome name="paint-brush" size={24} color="black" />
  if (name === "Outdoors") return <FontAwesome name="leaf" size={24} color="black" />
  if (name === "Food & Drink") return <Ionicons name="fast-food" size={24} color="black" />
  return <FontAwesome name="question-circle" size={32} color="black" />; // Default icon
};

export default function Categories({ categoryList }) {
  return (
    <View style={styles.container}>
      <Text style={styles.subHeadText}>Events by Category</Text>
      <FlatList
        data={categoryList}
       
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem}>
            {/* Render the icon */}
            {getIcon(item.name)}
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal // Makes the list scroll horizontally
        showsHorizontalScrollIndicator={true} // Hides the scroll indicator
        contentContainerStyle={styles.slider} // Add spacing for slider padding
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  subHeadText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  slider: {
    paddingHorizontal: 8,
  },
  categoryItem: {
    width: width * 0.4, // Make each item a percentage of screen width for responsiveness
    height: width * 0.4, // Ensure the height matches the width for a square shape
    marginHorizontal: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryText: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: "#171616",
    marginTop: 8,
    textAlign: "center",
  },
});

