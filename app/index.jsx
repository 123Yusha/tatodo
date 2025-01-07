import { Text, View, Stylesheet, SafeAreaView, StyleSheet } from "react-native";
import Landing from "./screens/Landing";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Landing/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,                    // Take up the full height of the screen
    justifyContent: 'center',   // Vertically center the content
    alignItems: 'center',       // Horizontally center the content
    backgroundColor: '#fff',    // Optional background color
  },
})