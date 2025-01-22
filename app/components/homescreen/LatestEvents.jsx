import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function LatestEvents({ eventList }) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.subHeadText}>Latest events</Text>
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
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.slider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
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
  eventItem: {
    width: 200, // Adjust width as necessary
    height: 200, // Adjust height as necessary
    marginHorizontal: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  eventDetails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  arrowIcon: {
  marginTop:10,
  },
});
