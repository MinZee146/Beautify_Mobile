import { Stack } from "expo-router";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { config } from "@tamagui/config/v3";

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="PromoScreen" options={{ title: "Promo" }} />
      </Stack>
    </TamaguiProvider>
  );
}
