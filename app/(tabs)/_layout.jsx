import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
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
              color="#171616"
            />
          ),
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
