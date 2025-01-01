import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text>About screen</Text>
      <Link href="/promo">Go to About screen</Link>
    </View>
  );
}
