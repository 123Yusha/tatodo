import { SafeAreaView, StyleSheet,Text, TouchableOpacity } from "react-native";
import { router, useRouter } from "expo-router";
import Landing from "./screens/Landing";
import Home from "./(tabs)/home";

export default function Index() {

  const router=useRouter();

  const handleBrowse = () => {
    router.push("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text> Welcome! </Text>
      <TouchableOpacity onPress={handleBrowse}>
        <Text>Browse App</Text>
      </TouchableOpacity>
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
