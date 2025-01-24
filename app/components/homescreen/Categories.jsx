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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter,  } from "expo-router";

const { width } = Dimensions.get("window");

const getIcon = (name) => {
  switch (name) {
    case "Pets":
      return <MaterialIcons name="pets" size={24} color="black" />;
    case "Music":
      return <FontAwesome name="music" size={32} color="black" />;
    case "Educational":
      return <FontAwesome6 name="book-open-reader" size={24} color="black" />;
    case "Nightlife":
      return (
        <MaterialCommunityIcons name="party-popper" size={24} color="black" />
      );
    case "Seasonal":
      return <FontAwesome name="tree" size={24} color="black" />;
    case "Business":
      return <FontAwesome6 name="business-time" size={24} color="black" />;
    case "Sports":
      return <FontAwesome name="soccer-ball-o" size={24} color="black" />;
    case "Family & Kids":
      return <MaterialIcons name="family-restroom" size={24} color="black" />;
    case "Markets & Fairs":
      return <FontAwesome5 name="store" size={24} color="black" />;
    case "Arts":
      return <FontAwesome5 name="theater-masks" size={24} color="black" />;
    case "Outdoors":
      return <FontAwesome name="leaf" size={24} color="black" />;
    case "Food & Drink":
      return <Ionicons name="fast-food" size={24} color="black" />;
    default:
      return <FontAwesome name="question-circle" size={32} color="black" />;
  }
};

export default function Categories({ categoryList }) {

  const router = useRouter();

  const handleCategoryPress = (categoryName) => {
    
    router.push({
      pathname: "/screens/EventsByCategory",
      params: { categoryName: categoryName }, //pass the event name to eventsbycategory as a parameter
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.subHeadText}>Events by category</Text>
      <FlatList
        data={categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(item.name)}
          >
            {getIcon(item.name)}
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.slider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    marginBottom: 10, // Add consistent spacing between components
    backgroundColor: "#fff",
  },
  subHeadText: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    marginBottom: 16,
    textAlign: "center",
  },
  slider: {
    paddingHorizontal: 8,
  },
  categoryItem: {
    width: width * 0.4,
    height: width * 0.4,
    marginHorizontal: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
  },
  categoryText: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: "#171616",
    marginTop: 8,
    textAlign: "center",
  },
});
