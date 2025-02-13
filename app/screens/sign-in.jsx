import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  StatusBar,
  
} from "react-native";
import { React, useState } from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/FirebaseConfig";

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const onSignIn = () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please complete all required fields", [
        {
          text: "Ok",
          onPress: () => console.log("Ok Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed in as:", user);
        router.replace("/(tabs)/home");
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/invalid-credential") {
          Alert.alert("Whoops!", "Invalid login credentials", [
            {
              text: "Ok",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }} backgroundColor="#fff">
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <View style={styles.backArrowContainer}>
                <TouchableOpacity onPress={handleBack}>
                  <Ionicons
                    name="arrow-back"
                    size={35}
                    color="#171616"
                    style={styles.backArrow}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.headerText}>Sign in to your account</Text>
                <Text style={styles.labelText}>Email address</Text>
                <TextInput
                  placeholder="Enter email address"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={"grey"}
                  style={styles.inputBox}
                  onChangeText={(value) => setEmail(value)}
                />
                <Text style={styles.labelText}>Password</Text>
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor={"grey"}
                  style={styles.inputBox}
                  secureTextEntry={true}
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => setPassword(value)}
                />
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={onSignIn}
                >
                  <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>

                <Link href="/screens/sign-up" asChild>
                  <TouchableOpacity style={styles.linkButton}>
                    <Text style={styles.linkText}>
                      Don't have an account? Sign up
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  backArrowContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    paddingHorizontal: 10,
  },
  backArrow: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: "#171616",
    marginBottom: 20,
    textAlign: "center",
  },
  labelText: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: "#171616",
    marginBottom: 5,
  },
  inputBox: {
    width: "80%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#171616",
    borderRadius: 8,
    marginBottom: 15,
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
  linkButton: {
    marginTop: 10,
    alignItems: "center",
  },
  linkText: {
    fontSize: 16,
    color: "#171616",
    fontFamily: "outfit-regular",
    textDecorationLine: "underline",
  },
});
