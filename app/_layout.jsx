import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { auth } from "../configs/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function RootLayout() {
  useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  const router = useRouter();
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Set a state to mark when the user has been checked
      setUserChecked(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userChecked) {
      
      router.replace("/(tabs)/home");
    }
  }, [userChecked, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
