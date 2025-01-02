import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { YStack, XStack, Text, Button, Image, Card, Separator } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

type CartItemProps = {
  name: string;
  price: number;
  quantity: number;
  image: string;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <Card padding={8} backgroundColor="$colorTransparent">
      <XStack space={12} alignItems="center">
        <Image
          source={{ uri: image }}
          width={100}
          height={100}
          borderRadius={8}
          resizeMode="cover"
        />
        <YStack flex={1}>
          <Text fontWeight="bold" fontSize={16} marginBottom={4}>
            {name}
          </Text>
          <Text color="#4caf50" fontWeight="bold" fontSize={15}>
            ${price.toFixed(2)}
          </Text>
          <XStack
            alignItems="center"
            justifyContent="space-between"
            marginTop={8}
          >
            {/* Quantity Controls */}
            <XStack alignItems="center" space={8}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onQuantityChange(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove-circle-outline" size={28} color="#000" />
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
            {/* Remove Button */}
            <TouchableOpacity activeOpacity={0.7} onPress={onRemove}>
              <Ionicons name="close-circle-outline" size={28} color="#d32f2f" />
            </TouchableOpacity>
          </XStack>
        </YStack>
      </XStack>
    </Card>
  );
};

type CartSummaryProps = {
  subtotal: number;
  shipping: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, shipping }) => {
  const total = subtotal + shipping;

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
      <TouchableOpacity activeOpacity={0.8} style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Checkout now</Text>
      </TouchableOpacity>
    </YStack>
  );
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Promio body lotion",
      price: 29.99,
      quantity: 1,
      image: "https://via.placeholder.com/150/FFCC80",
    },
    {
      id: 2,
      name: "Natural Organ oil",
      price: 49.99,
      quantity: 1,
      image: "https://via.placeholder.com/150/90CAF9",
    },
    {
      id: 3,
      name: "Promio body lotion",
      price: 29.99,
      quantity: 1,
      image: "https://via.placeholder.com/150/FFCC80",
    },
    {
      id: 4,
      name: "Natural Organ oil",
      price: 49.99,
      quantity: 1,
      image: "https://via.placeholder.com/150/90CAF9",
    },
    {
      id: 5,
      name: "Promio body lotion",
      price: 29.99,
      quantity: 1,
      image: "https://via.placeholder.com/150/FFCC80",
    },
    {
      id: 6,
      name: "Natural Organ oil",
      price: 49.99,
      quantity: 1,
      image: "https://via.placeholder.com/150/90CAF9",
    },
  ]);

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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 10.0;

  return (
    <YStack flex={1} backgroundColor="#fefefe">
      {/* Header */}
      <XStack
        padding={12}
        backgroundColor="#fff"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderColor="#e0e0e0"
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text fontWeight="700" fontSize={18}>
          My Cart
        </Text>
        <Ionicons name="bag-handle-outline" size={24} color="#000" />
      </XStack>

      {/* Cart Items */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <YStack padding={8}>
          {cartItems.map((item, index) => (
            <>
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(item.id, quantity)
                }
                onRemove={() => handleRemoveItem(item.id)}
              />

              {index < cartItems.length - 1 && <Separator my={12} />}
            </>
          ))}
        </YStack>
      </ScrollView>

      {/* Summary */}
      <CartSummary subtotal={subtotal} shipping={shipping} />
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
