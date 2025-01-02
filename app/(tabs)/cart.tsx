import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  YStack,
  XStack,
  Text,
  Button,
  Separator,
  Image,
  ScrollView,
  Card,
} from "tamagui";

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
    <Card
      padding={12}
      marginBottom={12}
      shadowRadius={4}
      backgroundColor="#fff" // Màu nền trắng
      borderWidth={1}
      borderColor="#e0e0e0"
    >
      <XStack space={12} alignItems="center">
        {/* Product Image */}
        <Image
          source={{ uri: image }}
          width={75}
          height={75}
          borderRadius={8}
          resizeMode="cover"
        />
        {/* Product Info */}
        <YStack flex={1}>
          <Text fontWeight="600" fontSize={16} marginBottom={4}>
            {name}
          </Text>
          <Text color="#4caf50" fontWeight="700" fontSize={14}>
            ${price.toFixed(2)}
          </Text>
          <XStack
            alignItems="center"
            justifyContent="space-between"
            marginTop={8}
          >
            {/* Quantity Controls */}
            <XStack alignItems="center" space={8}>
              <Ionicons
                name="remove-circle-outline"
                size={24}
                color="#000"
                onPress={() => onQuantityChange(Math.max(1, quantity - 1))}
              />
              <Text>{quantity}</Text>
              <Ionicons
                name="add-circle-outline"
                size={24}
                color="#000"
                onPress={() => onQuantityChange(quantity + 1)}
              />
            </XStack>
            {/* Remove Button */}
            <Ionicons
              name="trash"
              size={24}
              color="#ff5252"
              onPress={onRemove}
            />
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
      backgroundColor="#1a1a19" // Background sáng nhẹ
      shadowRadius={4}
      borderTopWidth={1}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
    >
      <XStack justifyContent="space-between">
        <Text color="#fff" fontWeight="bold">
          Grand total
        </Text>
        <Text color="#fff" fontWeight="bold">
          $0.00
        </Text>
      </XStack>
      <Button
        size="$3"
        color="##ff7777"
        backgroundColor="#ff7777"
        borderRadius={8}
        alignSelf="center"
        width="100%"
        marginTop={12}
      >
        <Text color="#fff" fontWeight="600">
          Checkout now
        </Text>
      </Button>
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
        <Ionicons name="return-down-back" size={24} color="#000" />
        <Text fontWeight="700" fontSize={18}>
          My Cart
        </Text>
        <Ionicons name="bag-handle-outline" size={24} color="#000" />
      </XStack>

      {/* Cart Items */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <YStack padding={16}>
          {cartItems.map((item) => (
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
          ))}
        </YStack>
      </ScrollView>

      {/* Summary */}
      <CartSummary subtotal={subtotal} shipping={shipping} />
    </YStack>
  );
};

export default CartPage;
