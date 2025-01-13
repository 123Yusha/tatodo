import {  SafeAreaView, StyleSheet } from "react-native";
import Landing from "./screens/Landing";
import { Redirect } from "expo-router";
import {auth} from "../configs/FirebaseConfig"

export default function Index() {
  
  const user = auth.currentUser
  return (
    <SafeAreaView style={styles.container}>
      {/* {user ? 
      <Redirect href={'/home'}/> :
      <Landing/>
      } */}
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