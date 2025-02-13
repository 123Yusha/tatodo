import { SafeAreaView, StyleSheet,Text } from "react-native";
import Landing from "./screens/Landing";
import Home from "./(tabs)/home";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text> Welcome! </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
