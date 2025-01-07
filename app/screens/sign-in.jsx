import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import { Link } from "expo-router";
import { useRouter } from 'expo-router';

export default function SignIn() {

  const router = useRouter();
    const handleBack = () => {
      // Use the router to navigate back to the previous screen
      router.back();
    };
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        <Text> Sign In Here</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1, // Take up the full height of the screen
        justifyContent: "center",
        alignItems: "center", // Horizontally center the content
        backgroundColor: "#fff", // Optional background color
      },
      backButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#171616", // Button background color
        borderRadius: 18,
        alignItems: "center", // Horizontally center the text
        justifyContent: "center", // Vertically center the text
        marginTop: 20, // Space from top
        width: "80%", // Button width
        elevation: 5, // Shadow for Android
        shadowColor: "#000", // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      buttonText: {
        fontSize: 18, // Font size
        color: "#fff", // Text color
        fontFamily: "outfit-regular", // Match your app's font
      },
    
})