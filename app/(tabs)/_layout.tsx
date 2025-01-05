import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { YStack } from "tamagui";

export default function TabLayout() {
  return (
    <YStack flex={1}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#ccc",
            height: 65,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            position: "absolute",
            bottom: 10,
            alignItems: "center",
          },
          tabBarIconStyle: {
            marginBottom: 20,
          },
          tabBarShowLabel: true,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                color={color}
                size={28}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="review"
          options={{
            title: "Reviews",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign
                name={focused ? "star" : "staro"}
                color={color}
                size={28}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign
                name={focused ? "infocirlce" : "infocirlceo"}
                color={color}
                size={28}
              />
            ),
          }}
        />
      </Tabs>
    </YStack>
  );
}
