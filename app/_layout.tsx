import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import { createFont } from "@tamagui/core";
import * as React from "react";

const fonts = {
  poppins: createFont({
    family: "Poppins",
    size: {
      1: 12,
      2: 14,
      3: 16,
      4: 18,
      5: 20,
    },
    weight: {
      1: "400",
      2: "500",
      3: "600",
    },
  }),
  playfair: createFont({
    family: "Playfair Display",
    size: {
      1: 14,
      2: 16,
      3: 18,
      4: 20,
      5: 24,
    },
    weight: {
      1: "400",
      2: "500",
      3: "700",
    },
  }),
};

const tamaguiConfig = createTamagui({
  ...config,
  fonts,
});

type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    "Playfair Display": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="PromoScreen" options={{ title: "Promo" }} />
        <Stack initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" />
          <Stack.Screen name="SignUp" />
        </Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
