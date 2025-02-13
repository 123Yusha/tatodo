import { SafeAreaView, StyleSheet } from "react-native";
import Landing from "./screens/Landing";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Landing />
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
