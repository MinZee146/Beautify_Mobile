import { Link, Route } from "expo-router";
import { Text, View } from "react-native";

const routes: { name: string; path: Route }[] = [
  { name: "Promo", path: "/promo" },
  { name: "Sign In", path: "/components/signin" },
  { name: "Sign Up", path: "/components/signup" },
  { name: "Home", path: "/home" },
  { name: "Product Detail", path: "/components/productDetail" },
  { name: "Cart", path: "/cart" },
  { name: "Checkout", path: "/components/checkout" },
  { name: "Order", path: "/components/order" },
  { name: "Order Detail", path: "/components/orderDetail" },
  { name: "Service", path: "/components/service" },
  { name: "Service Detail", path: "/components/serviceDetail" },
  { name: "Store Review", path: "/components/storeReview" },
];

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
        About Screen
      </Text>
      {routes.map((route, index) => (
        <Link key={index} href={route.path}>
          {route.name}
        </Link>
      ))}
    </View>
  );
}
