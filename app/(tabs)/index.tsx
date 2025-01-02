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
      <Link href="/components/signin">Go to Login screen</Link>
      <Link href="/components/signup">Go to Sign up screen</Link>
      <Link href="/home">Go to Home screen</Link>
    </View>
  );
}
