import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function EventDetails() {
  return (
    <View style={styles.container}>
      <Text>Event Details Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
