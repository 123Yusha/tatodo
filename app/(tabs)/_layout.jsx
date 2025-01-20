import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { auth, db } from "../../configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function TabLayout() {
  const [isEventOrganizer, setIsEventOrganizer] = useState(false);

  // Fetch user data to check if the user is an event organizer. Users can then manage events
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setIsEventOrganizer(userDoc.data().isEventOrganizer);
        }
      }
    };

    fetchUserData();
  }, []);
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#171616",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color="#171616" />
          ),
        }}
      />

      <Tabs.Screen
        name="browse-events"
        options={{
          title: "Browse",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event" size={24} color="#171616" />
          ),
        }}
      />
       
       <Tabs.Screen
        name="manage-events"
        options={{
          title: "Manage",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="arrange-send-backward"
              size={24}
              color={color}
            />
          ),
          href: isEventOrganizer ? "/manage-events" : null, // Hide the tab if not an event organizer
        }}
      />
       
      <Tabs.Screen
        name="my-account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-box" size={24} color="#171616" />
          ),
        }}
      />
    </Tabs>
  );
}
