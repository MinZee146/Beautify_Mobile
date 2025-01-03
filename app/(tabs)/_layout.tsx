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
      />
    </YStack>
  );
}
