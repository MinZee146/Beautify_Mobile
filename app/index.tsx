import { Text, View } from "react-native";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { config } from "@tamagui/config/v3";

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

export default function Index() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </TamaguiProvider>
  );
}
