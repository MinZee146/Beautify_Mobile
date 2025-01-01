import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          color: "#000",
          fontWeight: "bold",
          fontFamily: "Poppins",
        }}
      >
        About screen
      </Text>
      <Link href="/promo">Go to About screen</Link>
    </View>
  );
}
