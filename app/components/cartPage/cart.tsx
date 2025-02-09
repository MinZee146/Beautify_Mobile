import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Image,
  Card,
  Separator,
  View,
  ScrollView,
} from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useRouter } from "expo-router";
import OrderItem, { sampleCartItems } from "@/app/enities/cartItem";

const CartItem = ({
  id,
  name,
  price,
  quantity,
  image,
  isChecked,
  onQuantityChange,
  onRemove,
  onToggleCheck,
}: OrderItem) => {
  return (
    <Card padding={8} backgroundColor="$colorTransparent" width="100%">
      <XStack display="flex" justifyContent="space-between">
        <XStack
          display="flex"
          justifyContent="space-between"
          space //dung co xoa cai nay nha
          alignItems="center"
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onToggleCheck(id)}
          >
            <Ionicons
              name={isChecked ? "checkbox" : "square-outline"}
              size={24}
              color={isChecked ? "#5CB338" : "#BCCCDC"}
            />
          </TouchableOpacity>
          <XStack space={12} alignItems="center">
            <Image
              source={image}
              width={100}
              height={100}
              borderRadius={8}
              resizeMode="cover"
            />
            <YStack flex={1}>
              <Text fontWeight="bold" fontSize={16} marginBottom={4}>
                {name}
              </Text>
              <Text color="#FF6D00" fontWeight="bold" fontSize={15}>
                ${price.toFixed(2)}
              </Text>

              {/* Quantity Controls */}
              <XStack alignItems="center" space={8} marginTop={8}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    if (quantity - 1 <= 0) {
                      onRemove();
                    } else {
                      onQuantityChange(quantity - 1);
                    }
                  }}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={28}
                    color="#000"
                  />
                </TouchableOpacity>
                <Text fontSize={15} fontWeight="bold">
                  {quantity}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => onQuantityChange(quantity + 1)}
                >
                  <Ionicons name="add-circle-outline" size={28} color="#000" />
                </TouchableOpacity>
              </XStack>
            </YStack>
          </XStack>
        </XStack>
      </XStack>
    </Card>
  );
};

type CartSummaryProps = {
  total: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({ total }) => {
  return (
    <YStack
      padding={16}
      backgroundColor="#1a1a19"
      shadowRadius={4}
      borderTopWidth={1}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
    >
      <XStack justifyContent="space-between">
        <Text style={styles.totalText}>Grand total</Text>
        <Text style={styles.totalText}>${total.toFixed(2)}</Text>
      </XStack>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.checkoutButton}
        onPress={() => router.push("/components/checkoutPage/checkout")}
      >
        <Text style={styles.checkoutText}>Checkout now</Text>
      </TouchableOpacity>
    </YStack>
  );
};

const CartPage: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(sampleCartItems);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleToggleCheck = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleToggleSelectAll = () => {
    const allChecked = cartItems.every((item) => item.isChecked);
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isChecked: !allChecked }))
    );
  };

  const total = cartItems.reduce(
    (sum: number, item: any) =>
      item.isChecked ? sum + item.price * item.quantity : sum,
    0
  );

  return (
    <YStack flex={1} backgroundColor="#fefefe">
      {/* Header */}
      <XStack
        padding={12}
        paddingHorizontal={20}
        backgroundColor="#0b0b0b"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderColor="#e0e0e0"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FBFCD4" />
        </TouchableOpacity>
        <Text fontWeight="700" fontSize={18} color="#FBFCD4">
          My Cart
        </Text>
        <TouchableOpacity onPress={handleToggleSelectAll}>
          <Ionicons
            name={
              cartItems.every((item) => item.isChecked)
                ? "checkbox"
                : "square-outline"
            }
            size={24}
            color={
              cartItems.every((item) => item.isChecked) ? "#5CB338" : "#BCCCDC"
            }
          />
        </TouchableOpacity>
      </XStack>

      {/* Cart Items */}
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <YStack padding={8}>
          {cartItems.map((item, index) => (
            <View key={item.id}>
              <CartItem
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                isChecked={item.isChecked ?? false}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(item.id, quantity)
                }
                onRemove={() => handleRemoveItem(item.id)}
                onToggleCheck={handleToggleCheck}
              />
              {index < cartItems.length - 1 && <Separator my={12} />}
            </View>
          ))}
        </YStack>
      </ScrollView>
      {/* Summary */}
      <CartSummary total={total} />
    </YStack>
  );
};

const styles = StyleSheet.create({
  checkoutButton: {
    marginTop: 12,
    backgroundColor: "#ff7777",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  totalText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default CartPage;
