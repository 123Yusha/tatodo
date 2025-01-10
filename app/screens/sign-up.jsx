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
  Switch,
} from "react-native";
import { React, useState, useRef } from "react";
import { useRouter, Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmEmail, setConfirmEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled" // Ensures taps outside of input fields dismiss the keyboard
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <TouchableOpacity onPress={handleBack}>
                <Ionicons
                  name="arrow-back"
                  size={35}
                  color="#171616"
                  style={styles.backArrow}
                />
              </TouchableOpacity>
              <View style={styles.inputContainer}>
                <Text style={styles.headerText}>Create an account</Text>

                <Text style={styles.labelText}>Full name</Text>
                <TextInput
                  placeholder="Enter your name"
                  placeholderTextColor={"grey"}
                  style={styles.inputBox}
                  onChangeText={(value) => setName(value)}
                />

                <Text style={styles.labelText}>Email address</Text>
                <TextInput
                  placeholder="Enter email address"
                  placeholderTextColor={"grey"}
                  style={styles.inputBox}
                  onChangeText={(value) => setEmail(value)}
                />

                <Text style={styles.labelText}>Confirm email</Text>
                <TextInput
                  placeholder="Confirm email address"
                  placeholderTextColor={"grey"}
                  style={styles.inputBox}
                  onChangeText={(value) => setConfirmEmail(value)}
                />

                <Text style={styles.labelText}>Create password</Text>
                <TextInput
                  placeholder="Create a password"
                  placeholderTextColor={"grey"}
                  style={styles.inputBox}
                  secureTextEntry
                  onChangeText={(value) => setPassword(value)}
                />

                <Text style={styles.labelText}>Confirm password</Text>
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor={"grey"}
                  style={styles.inputBox}
                  secureTextEntry
                  onChangeText={(value) => setConfirmPassword(value)}
                />
                <View style={styles.toggleContainer}>
                  <Text style={styles.labelText}>
                    Event organiser? Toggle the option below if you wish to
                    create and manage local events (subject to approval).
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>

                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>

                <Link href="/screens/sign-in" asChild>
                  <TouchableOpacity style={styles.linkButton}>
                    <Text style={styles.linkText}>
                      Already have an account?
                      <Text style={styles.linkTextBold}>Sign in</Text>
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  toggleContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  backArrow: {
    margin: 20,
    position: "absolute", // Keeps it fixed in place
    top: 10,
    left: 10,
  },
  inputContainer: {
    flex: 1, // Takes the remaining space
    justifyContent: "center", // Vertically centers the content
    alignItems: "center", // Horizontally centers the content
    width: "100%", // Full width of the screen
    paddingTop: 50, // Additional space from the top
  },

  headerText: {
    fontSize: 24,
    fontFamily: "outfit-regular",
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
  linkTextBold: {
    fontWeight: "bold",
  },
});
