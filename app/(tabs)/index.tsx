import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text>About screen</Text>
      <Link href="/promo">Go to About screen</Link>
      <Link href="/auth/signin">Go to Login screen</Link>
      <Link href="/auth/signup">Go to Sign up screen</Link>
    </View>
  );
}
