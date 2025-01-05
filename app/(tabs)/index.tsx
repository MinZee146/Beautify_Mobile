import { Link, LinkProps } from "expo-router";
import { Text, View } from "react-native";

const routes: {
  name: string;
  path: string;
}[] = [
  { name: "Sign In", path: "/components/authPage/signin" },
  { name: "Sign Up", path: "/components/authPage/signup" },
  { name: "Profile", path: "/profile" },
  { name: "Home", path: "/home" },
  { name: "Product Detail", path: "/components/productPage/productDetail" },
  { name: "Cart", path: "/components/cartPage/cart" },
  { name: "Checkout", path: "/components/checkoutPage/checkout" },
  { name: "Order", path: "/components/orderPage/order" },
  { name: "Order Detail", path: "/components/orderPage/orderDetail" },
  { name: "Store Review", path: "/components/reviewPage/storeReview" },
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
        <Link key={index} href={route.path as LinkProps["href"]}>
          {route.name}
        </Link>
      ))}
    </View>
  );
}
