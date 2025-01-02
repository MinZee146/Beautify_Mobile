import React, { useState } from "react";
import {
  YStack,
  XStack,
  Text,
  Button,
  Separator,
  Image,
  ScrollView,
} from "tamagui";

type CartItemProps = {
  name: string;
  volume: string;
  price: number;
  quantity: number;
  image: string;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  name,
  volume,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <XStack
      padding="$4"
      alignItems="center"
      space="$4"
      borderBottomWidth={1}
      borderColor="$gray4"
      backgroundColor="$backgroundSoft"
      borderRadius="$4"
      marginBottom="$4"
    >
      {/* Product Image */}
      <Image
        source={{ uri: image }}
        width={80}
        height={80}
        borderRadius="$3"
        resizeMode="cover"
      />
      {/* Product Info */}
      <YStack flex={1} space="$2">
        <Text fontWeight="700" fontSize="$4">
          {name}
        </Text>
        <Text fontSize="$2" color="$gray8">
          {volume}
        </Text>
        <Text color="$green10" fontWeight="700" fontSize="$4">
          € {price.toFixed(2)}
        </Text>
      </YStack>
      {/* Quantity Controls */}
      <XStack alignItems="center" space="$2">
        <Button
          size="$2"
          onPress={() => onQuantityChange(Math.max(1, quantity - 1))}
          backgroundColor="$gray3"
        >
          -
        </Button>
        <Text>{quantity}</Text>
        <Button
          size="$2"
          onPress={() => onQuantityChange(quantity + 1)}
          backgroundColor="$gray3"
        >
          +
        </Button>
      </XStack>
      {/* Remove Button */}
      <Button
        size="$2"
        color="$red10"
        backgroundColor="$red3"
        onPress={onRemove}
      >
        X
      </Button>
    </XStack>
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
      padding="$4"
      space="$4"
      backgroundColor="$backgroundSoft"
      borderRadius="$4"
    >
      <XStack justifyContent="space-between">
        <Text fontSize="$3">Sub Total</Text>
        <Text fontSize="$3">€ {subtotal.toFixed(2)}</Text>
      </XStack>
      <XStack justifyContent="space-between">
        <Text fontSize="$3">Shipping</Text>
        <Text fontSize="$3">€ {shipping.toFixed(2)}</Text>
      </XStack>
      <Separator />
      <XStack justifyContent="space-between">
        <Text fontWeight="700" fontSize="$4">
          Total
        </Text>
        <Text fontWeight="700" fontSize="$4" color="$green10">
          € {total.toFixed(2)}
        </Text>
      </XStack>
      <Button
        size="$4"
        color="$white"
        backgroundColor="$green10"
        alignSelf="center"
      >
        Checkout
      </Button>
    </YStack>
  );
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Promio body lotion",
      volume: "200 ml",
      price: 29.99,
      quantity: 1,
      image: "https://via.placeholder.com/150", // Replace with actual image URLs
    },
    {
      id: 2,
      name: "Natural Organ oil",
      volume: "100 ml",
      price: 49.99,
      quantity: 1,
      image: "https://via.placeholder.com/150", // Replace with actual image URLs
    },
  ]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 10.0;

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      <ScrollView>
        <YStack flex={1} space="$4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              volume={item.volume}
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
      <CartSummary subtotal={subtotal} shipping={shipping} />
    </YStack>
  );
};

export default CartPage;
