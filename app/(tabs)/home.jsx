import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'


export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
<StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}
        style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.headerText}>Home</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles= StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-regular",
    color: "#171616",
    marginTop:10,
    textAlign: "center",
  },
})