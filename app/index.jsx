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
      <Text style={styles.headerText}> You are no longer signed in! </Text>
      <TouchableOpacity style={styles.button} onPress={handleBrowse}>
        <Text style={styles.buttonText}>Browse App</Text>
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
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: "#171616",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "outfit-regular",
  },
});
