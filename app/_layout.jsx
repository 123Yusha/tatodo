import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import {auth} from "../configs/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";


export default function RootLayout() {
  useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    // Set up Firebase authentication listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Navigate to the (tabs) layout if the user is authenticated
        router.replace("/home");
      } else {
        // Navigate to the login or landing page if not authenticated
        router.replace("/"); // Replace with your login route
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [router]);

  

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
